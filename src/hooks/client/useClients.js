// Hooks
import { usePaginatedFetch } from "../usePaginatedFetch";

// Servicos
import { getAllClients } from "../../services/clientService";

export const useClients = () => {
  const { data, ...rest } = usePaginatedFetch({
    fetchService: getAllClients,
  });

  return {
    data: data.clientes,
    ...rest,
  };
};
