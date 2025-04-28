// Hooks
import { usePaginatedData } from "../../hooks/usePaginatedData";

// Servicos
import { getAllClients } from "../../services/clientService";

export const useClients = () => {
  const { data, ...rest } = usePaginatedData({
    initialFilter: "",
    fetchService: (filter, page, itemsPerPage) => getAllClients(filter, page, itemsPerPage),
  });

  return {
    data: data.clientes,
    ...rest,
  };
};
