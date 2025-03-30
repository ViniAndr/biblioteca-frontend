import { useEffect, useState } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// service
import { getAttributeData } from "../services/bookService";

// Recebe o Service certo para buscar na API, e a entindade para buscar na resposta
export const BookAttributes = (entity) => {
  // Back em português
  const selectedEntity = {
    publisher: "editora",
    author: "autor",
    category: "categoria",
  };

  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [bookData, setbookData] = useState([]);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  // Buscar atributos
  const fetchBookData = async () => {
    try {
      setLoading(true);
      const response = await getAttributeData(filter, page, itemsPerPage, selectedEntity[entity]);

      // Transformando os dados - esse array de objetos tem um outro objeto dentro que mostra quantos livro usa essa editora
      const formattedData = response.data[selectedEntity[entity]].map(({ _count, ...rest }) => ({
        ...rest,
        livros: `${_count.livros} - Livros`, // Adiciona "livros" como um campo separado
      }));

      setbookData(formattedData || []);
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
    fetchBookData();
  }, [page, filter, itemsPerPage]);

  return {
    bookData,
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
