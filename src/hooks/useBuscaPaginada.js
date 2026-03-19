import { useState, useEffect, useCallback, useRef } from "react";
import { useAlerta } from "../contexts/AlertaContext";

export const useBuscaPaginada = ({ servicoBusca }) => {
  const { mostrarAlerta } = useAlerta();
  // State para armazenar apenas os filtros dos selects
  const [filtro, setFiltro] = useState({});
  // State para armazenar o valor do campo de busca
  const [pesquisa, setPesquisa] = useState("");
  const [pesquisaDebounced, setPesquisaDebounced] = useState(pesquisa);

  const [estado, setEstado] = useState({
    dados: [],
    carregando: true,
    pagina: 1,
    itensPorPagina: 20,
    totalPaginas: 1,
    totalItens: 0,
    erro: null,
  });

  // Usamos useRef para manter uma referência estável da função servicoBusca
  const servicoBuscaRef = useRef(servicoBusca);
  servicoBuscaRef.current = servicoBusca;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPesquisaDebounced(pesquisa);
    }, 500);
    return () => clearTimeout(timer);
  }, [pesquisa]);

  const buscarDados = useCallback(async () => {
    try {
      setEstado((prev) => ({ ...prev, carregando: true, erro: null }));

      const filtroAtual = { ...filtro, pesquisa: pesquisaDebounced ?? "" };

      // Chama o serviço de busca com os parâmetros atuais
      const response = await servicoBuscaRef.current(filtroAtual, estado.pagina, estado.itensPorPagina);

      if (!response.data) throw new Error("Dados não encontrados");

      setEstado((prev) => ({
        ...prev,
        dados: response.data || [],
        carregando: false,
        totalPaginas: response.data.qtdTotalDePaginas || 1,
        pagina: prev.pagina,
        totalItens: response.data.total || 0,
      }));
    } catch (error) {
      mostrarAlerta(error.message || "Erro ao buscar dados", "error");
      setEstado((prev) => ({
        ...prev,
        carregando: false,
        erro: error.message,
      }));
    }
  }, [pesquisaDebounced, filtro, estado.pagina, estado.itensPorPagina, mostrarAlerta]);

  useEffect(() => {
    buscarDados();
  }, [buscarDados]);

  const setTextoPesquisa = (valor) => {
    if (valor === undefined || valor === null || valor === pesquisa) return;

    setPesquisa(valor);
    setEstado((prev) => ({ ...prev, pagina: 1 }));
  };

  const atualizarFiltro = (novoFiltro) => {
    setFiltro((prev) => ({
      ...prev,
      ...novoFiltro,
    }));
    setEstado((prev) => ({ ...prev, pagina: 1 }));
  };

  const definirItensPorPagina = (valor) => {
    setEstado((prev) => ({ ...prev, itensPorPagina: valor, pagina: 1 }));
  };

  const definirPagina = (valor) => {
    setEstado((prev) => ({ ...prev, pagina: valor }));
  };

  return {
    ...estado,
    filtro,
    pesquisa,
    setPesquisa: setTextoPesquisa,
    setFiltro: atualizarFiltro,
    setPagina: definirPagina,
    setItensPorPagina: definirItensPorPagina,
    recarregar: buscarDados,
  };
};
