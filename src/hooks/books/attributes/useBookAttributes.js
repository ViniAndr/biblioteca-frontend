import { useState, useEffect } from "react";
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

  const [tempFilter, setTempFilter] = useState("");

  const { data, setPage, filter, setFilter, refetch, ...rest } = usePaginatedFetch({
    initialFilter: "",
    fetchService: (filter, page, itemsPerPage) => getAttributeData(filter, page, itemsPerPage, ENTITY_MAP[entity]),
  });

  // Atualiza o filtro temporário imediatamente
  const handleInputChange = (value) => {
    setTempFilter(value);
  };

  // Aplica o debounce para atualizar o filtro real
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tempFilter !== filter) {
        setFilter(tempFilter);
        setPage(1);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [tempFilter, setFilter, setPage]);

  // Formatação específica
  const formattedData =
    data[ENTITY_MAP[entity]]?.map(({ _count, ...rest }) => ({
      ...rest,
      livros: `${_count?.livros || 0} - Livros`,
    })) || [];

  return {
    data: formattedData,
    filter: tempFilter,
    setFilter: handleInputChange,
    setPage,
    ...rest,
  };
};
