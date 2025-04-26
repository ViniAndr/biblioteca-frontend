import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getAllLoans } from "../services/loansService";

export const useLoans = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);

  const [loans, setLoans] = useState([]);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  // Buscar Emprestimos
  const fetchLoans = async () => {
    setLoading(true);

    try {
      const response = await getAllLoans(filter, page, itemsPerPage);

      // formatar dados e ordenar
      const formattedData = response.data.emprestimos.map((loan) => {
        return {
          id: loan.id,
          book: loan.livro.titulo,
          isbn: loan.livro.isbn,
          date: loan.dataSolicitacao,
          client: loan.cliente.nome,
          status: loan.status,
        };
      });

      setLoans(formattedData || []);
      setTotalPages(response.data.qtdTotalDePaginas || 1);
      setPage(response.data.paginaAtual || 1);
      settotalItens(response.data.total || 0);
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [page, filter, itemsPerPage]);

  return {
    loans,
    loading,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItens,
  };
};
