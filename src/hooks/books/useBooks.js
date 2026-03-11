import { useAllAttributes } from "./attributes/useAllAttributes";
import { usePaginatedFetch } from "../usePaginatedFetch";

// Serviços e utilitários
import { getAllBooks } from "../../services/bookService";
import { formatBookForDashboard } from "../../utils/formatters";

export const useBooks = () => {
  // 1. Pega as listas completas (sem depender dos livros na tela)
  const { authors, publishers, categories, refetch: refetchAttributes } = useAllAttributes();

  // 2. Pega a lista de livros paginada
  const {
    data,
    setFilter,
    refetch: refetchBooks,
    ...rest
  } = usePaginatedFetch({
    fetchService: getAllBooks,
  });

  // 3. O nosso "Super Refetch" que atualiza as duas coisas ao mesmo tempo
  const handleRefetchAll = () => {
    if (refetchBooks) refetchBooks();
    if (refetchAttributes) refetchAttributes();
  };

  // 4. Retorna os dados diretos, limpos e prontos para o Books.jsx usar
  return {
    books: data?.livros?.map(formatBookForDashboard) || [],
    authors: authors || [],
    publishers: publishers || [],
    categories: categories || [],
    setFilterField: (key, value) => setFilter({ [key]: value }),
    refetch: handleRefetchAll,
    ...rest,
  };
};
