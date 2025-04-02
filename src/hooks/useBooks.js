import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getAllBooks } from "../services/bookService";

export const useBooks = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  // Buscar todos os livros
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getAllBooks(filter, page, itemsPerPage);

      // formatar dados e ordenar
      const formattedData = response.data.livros.map(({ autor, editora, categoria, ...rest }) => ({
        id: rest.id,
        titulo: rest.titulo,
        isbn: rest.isbn,
        autor: autor.nome,
        editora: editora.nome,
        qtdCopias: rest.qtdCopias,
      }));

      setBooks(formattedData || []);
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
    fetchBooks();
  }, [filter, page, itemsPerPage]);

  return {
    books,
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
