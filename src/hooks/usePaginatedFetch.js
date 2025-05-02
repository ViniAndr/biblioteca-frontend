import { useState, useEffect, useCallback, useRef } from "react";
import { useAlert } from "../contexts/AlertContext";

export const usePaginatedFetch = ({ fetchService }) => {
  const { showAlert } = useAlert();
  // State para armazenar apenas os filtros dos selects
  const [filter, setFilter] = useState({});
  // State para armazenar o valor do campo de busca
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [state, setState] = useState({
    data: [],
    loading: true,
    page: 1,
    itemsPerPage: 20,
    totalPages: 1,
    totalItems: 0,
    error: null,
  });

  // Usamos useRef para manter uma referência estável da função fetchService
  const fetchServiceRef = useRef(fetchService);
  fetchServiceRef.current = fetchService;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const currentFilter = { ...filter, search: debouncedSearch ?? "" };

      // Chama o serviço de busca com os parâmetros atuais
      const response = await fetchServiceRef.current(currentFilter, state.page, state.itemsPerPage);

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
  }, [debouncedSearch, filter, state.page, state.itemsPerPage, showAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setSearchText = (value) => {
    if (value == undefined || value == null || value === search) return;

    setSearch(value);
    setState((prev) => ({ ...prev, page: 1 }));
  };

  const updateFilter = (newFilter) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
    }));
    setState((prev) => ({ ...prev, page: 1 }));
  };

  const setItemsPerPage = (value) => {
    setState((prev) => ({ ...prev, itemsPerPage: value, page: 1 }));
  };

  const setPage = (value) => {
    setState((prev) => ({ ...prev, page: value }));
  };

  return {
    ...state,
    filter,
    search,
    setSearch: setSearchText,
    setFilter: updateFilter,
    setPage,
    setItemsPerPage,
    refetch: fetchData,
  };
};
