// Hooks
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch";

// Servicos e utilitarios
import { getTopBooks } from "../../services/bookService";
import { formatBookForHome } from "../../utils/formatters";

export const useTopBooks = () => {
  const { data } = usePaginatedFetch({
    initialFilter: "",
    fetchService: () => getTopBooks(),
  });

  // Formatação específica
  const formattedData =
    data.map((book) => {
      return formatBookForHome(book);
    }) || [];

  return {
    data: formattedData,
  };
};
