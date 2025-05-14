// Hooks
import { usePaginatedFetch } from "../../usePaginatedFetch";

// Service
import { getAttributeData } from "../../../services/bookService";

export const useBookAttributes = (entity) => {
  // Mapeamento de entidades para endpoints da API
  const ENTITY_MAP = {
    publisher: "editora",
    author: "autor",
    category: "categoria",
  };

  const { data, ...rest } = usePaginatedFetch({
    fetchService: (filter, page, itemsPerPage) => getAttributeData(filter, page, itemsPerPage, ENTITY_MAP[entity]),
  });

  // Formatação específica
  const formattedData =
    data[ENTITY_MAP[entity]]?.map(({ _count, ...rest }) => ({
      ...rest,
      livros: `${_count?.livros || 0} - Livros`,
    })) || [];

  return {
    data: formattedData,
    ...rest,
  };
};
