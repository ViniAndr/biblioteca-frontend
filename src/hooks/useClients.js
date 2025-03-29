import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getAllClients } from "../services/clientService";

export const useClients = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState([]);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  // Buscar Clientes
  const fetchClients = async () => {
    setLoading(true);

    try {
      const response = await getAllClients(filter, page, itemsPerPage);

      setClients(response.data.clientes || []);
      setTotalPages(response.data.qtdTotalDePaginas || 1);
      setPage(response.data.paginaAtual || 1);
      settotalItens(response.data.total || 0);
    } catch (error) {
      console.log("Porque aqui?");
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, filter, itemsPerPage]);

  return {
    clients,
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
