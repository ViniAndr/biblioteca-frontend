import { useState, useEffect, useCallback, useRef } from "react";
import { useAlert } from "../contexts/AlertContext";

export const usePaginatedData = ({ initialFilter = "", fetchService }) => {
  const { showAlert } = useAlert();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);

  // Usamos useRef para manter uma referência estável da função fetchService
  const fetchServiceRef = useRef(fetchService);
  fetchServiceRef.current = fetchService;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchServiceRef.current(filter, page, itemsPerPage);

      if (!response.data) throw new Error("Dados não encontrados");

      setData(response.data || []);
      setTotalPages(response.data.qtdTotalDePaginas || 1);
      setPage(response.data.paginaAtual || 1);
      setTotalItems(response.data.total || 0);
    } catch (error) {
      showAlert(error.message || "Erro ao buscar dados", "error");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filter, page, itemsPerPage, showAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetFilter = (value) => {
    setFilter(value);
    setPage(1); // Reset da página ao filtrar
  };

  const handleSetItemsPerPage = (value) => {
    setItemsPerPage(value);
    setPage(1); // Reset da página ao mudar itens por página
  };

  const handleSetPage = (value) => {
    setPage(value);
  };

  return {
    data,
    loading,
    filter,
    page,
    itemsPerPage,
    totalPages,
    totalItems,
    error,
    setFilter: handleSetFilter,
    setPage: handleSetPage,
    setItemsPerPage: handleSetItemsPerPage,
    refetch: fetchData,
  };
};
