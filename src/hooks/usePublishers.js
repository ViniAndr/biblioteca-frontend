import { useEffect, useState } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getPublishers } from "../services/bookService";

export const usePublishers = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [publishers, setPublishers] = useState([]);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  // Buscar Editoras
  const fetchPublishers = async () => {
    try {
      setLoading(true);
      const response = await getPublishers(filter, page, itemsPerPage);

      // Transformando os dados - esse array de objetos tem um outro objeto dentro que mostra quantos livro usa essa editora
      const formattedPublishers = response.data.editora.map(({ _count, ...rest }) => ({
        ...rest,
        livros: `${_count.livros} - Livros`, // Adiciona "livros" como um campo separado
      }));

      setPublishers(formattedPublishers || []);
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
    fetchPublishers();
  }, [page, filter, itemsPerPage]);

  return {
    publishers,
    filter,
    setFilter,
    loading,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItens,
  };
};
