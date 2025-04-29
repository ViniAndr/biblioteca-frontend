import { useState, useEffect, useCallback, useRef } from "react";
import { useAlert } from "../contexts/AlertContext";

export const usePaginatedFetch = ({ fetchService }) => {
  const { showAlert } = useAlert();
  const [state, setState] = useState({
    data: [],
    loading: true,
    filter: "",
    page: 1,
    itemsPerPage: 20,
    totalPages: 1,
    totalItems: 0,
    error: null,
  });

  // Usamos useRef para manter uma referência estável da função fetchService
  const fetchServiceRef = useRef(fetchService);
  fetchServiceRef.current = fetchService;

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetchServiceRef.current(state.filter, state.page, state.itemsPerPage);

      if (!response.data) throw new Error("Dados não encontrados");

      setState((prev) => ({
        ...prev,
        data: response.data || [],
        loading: false,
        totalPages: response.data.qtdTotalDePaginas || 1,
        page: prev.page,
        totalItems: response.data.total || 0,
      }));
    } catch (error) {
      showAlert(error.message || "Erro ao buscar dados", "error");
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [state.filter, state.page, state.itemsPerPage, showAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Setters simplificados
  const setFilter = (value) => {
    setState((prev) => ({ ...prev, filter: value, page: 1 }));
  };

  const setItemsPerPage = (value) => {
    setState((prev) => ({ ...prev, itemsPerPage: value, page: 1 }));
  };

  const setPage = (value) => {
    setState((prev) => ({ ...prev, page: value }));
  };

  return {
    ...state,
    setFilter,
    setPage,
    setItemsPerPage,
    refetch: fetchData,
  };
};
