import { useState, useEffect } from "react";
// Hooks
import { usePaginatedFetch } from "../usePaginatedFetch";

// Servicos
import { getAllClients } from "../../services/clientService";

export const useClients = () => {
  const [tempFilter, setTempFilter] = useState(""); // Estado temporário para o filtro
  const { data, setPage, filter, setFilter, refetch, ...rest } = usePaginatedFetch({
    fetchService: (filter, page, itemsPerPage) => getAllClients(filter, page, itemsPerPage),
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

  return {
    data: data.clientes,
    filter: tempFilter, // Retorna o filtro temporário para o input
    setFilter: handleInputChange, // Atualiza o filtro temporário
    ...rest,
  };
};
