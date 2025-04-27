import { useEffect, useState, useCallback } from "react";

// Contextos
import { useAlert } from "../../../contexts/AlertContext";

// Service
import { getAttributeData } from "../../../services/bookService";

// Mapeamento de entidades para endpoints da API
const ENTITY_MAP = {
  publisher: "editora",
  author: "autor",
  category: "categoria",
};

export const useBookAttributes = (entity) => {
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

  // Função de fetch memoizada para evitar recriação desnecessária
  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await getAttributeData(state.filter, state.page, state.itemsPerPage, ENTITY_MAP[entity]);

      if (!response.data) throw new Error("Dados não encontrados");

      const formattedData = response.data[ENTITY_MAP[entity]].map(({ _count, ...rest }) => ({
        ...rest,
        livros: `${_count?.livros || 0} - Livros`,
      }));

      setState({
        ...state,
        data: formattedData,
        loading: false,
        totalPages: response.data.qtdTotalDePaginas || 1,
        page: response.data.paginaAtual || 1,
        totalItems: response.data.total || 0,
      });
    } catch (error) {
      showAlert(error.message || "Erro ao buscar dados", "error");
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [entity, state.filter, state.page, state.itemsPerPage, showAlert]);

  // Atualizações condicionais para evitar loops
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Funções de atualização que garantem o reset da página quando necessário
  const setFilter = (value) => {
    setState((prev) => ({
      ...prev,
      filter: value,
      page: 1, // Reset da página ao filtrar
    }));
  };

  const setItemsPerPage = (value) => {
    setState((prev) => ({
      ...prev,
      itemsPerPage: value,
      page: 1, // Reset da página ao mudar itens por página
    }));
  };

  return {
    ...state,
    setFilter,
    setPage: (page) => setState((prev) => ({ ...prev, page })),
    setItemsPerPage,
    refetch: fetchData, // Expõe a função para recarga manual
  };
};
