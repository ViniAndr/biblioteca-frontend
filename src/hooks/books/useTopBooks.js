import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../../contexts/AlertContext";

// Servicos
import { getTopBooks } from "../../services/bookService";
import { formatBookForHome } from "../../utils/formatters";

export const useTopBooks = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);

  // Buscar todos os livros
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getTopBooks();

      // formatar dados e ordenar
      const formattedData = response.data.map((book) => {
        return formatBookForHome(book);
      });

      setBooks(formattedData || []);
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
  };
};
