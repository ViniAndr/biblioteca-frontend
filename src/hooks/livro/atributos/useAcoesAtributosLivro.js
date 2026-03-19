import { useState } from "react";
import { useAlerta } from "../../../contexts/AlertaContext";
import { criarAtributo, excluirAtributo, atualizarAtributo } from "../../../services/livroService";

// Mapa preparado para aceitar tanto o código antigo em inglês quanto o novo em português
const MAPA_ENTIDADE = {
  publisher: "editora",
  editora: "editora",
  author: "autor",
  autor: "autor",
  category: "categoria",
  categoria: "categoria",
};

export const useAcoesAtributosLivro = (entidade) => {
  const { mostrarAlerta } = useAlerta();
  const nomeEntidadeApi = MAPA_ENTIDADE[entidade] || entidade;

  const [estadoAcao, setEstadoAcao] = useState({
    carregando: false,
    acaoAtual: null, // 'criar' | 'atualizar' | 'deletar'
    erro: null,
  });

  const criar = async (dados) => {
    try {
      setEstadoAcao({ carregando: true, acaoAtual: "criar", erro: null });

      const resultado = await criarAtributo(nomeEntidadeApi, dados);

      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      mostrarAlerta(`${nomeEntidadeApi} criado(a) com sucesso!`, "success");
      return { success: true, data: resultado.data || resultado };
    } catch (error) {
      mostrarAlerta(error.message || `Erro ao criar ${nomeEntidadeApi}`, "error");
      setEstadoAcao((prev) => ({ ...prev, erro: error.message }));
      return { success: false, error: error.message };
    } finally {
      setEstadoAcao((prev) => ({ ...prev, carregando: false }));
    }
  };

  const atualizar = async (id, dados) => {
    try {
      setEstadoAcao({ carregando: true, acaoAtual: "atualizar", erro: null });
      const resultado = await atualizarAtributo(nomeEntidadeApi, id, dados);
      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      mostrarAlerta(`${nomeEntidadeApi} atualizado(a) com sucesso!`, "success");
      return { success: true, data: resultado.data || resultado };
    } catch (error) {
      mostrarAlerta(error.message || `Erro ao atualizar ${nomeEntidadeApi}`, "error");
      setEstadoAcao((prev) => ({ ...prev, erro: error.message }));
      return { success: false, error: error.message };
    } finally {
      setEstadoAcao((prev) => ({ ...prev, carregando: false }));
    }
  };

  const acaoDeletar = async (id) => {
    try {
      setEstadoAcao({ carregando: true, acaoAtual: "deletar", erro: null });

      const resultado = await excluirAtributo(nomeEntidadeApi, id);

      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      mostrarAlerta(`${nomeEntidadeApi} deletado(a) com sucesso!`, "success");
      return { success: true };
    } catch (error) {
      mostrarAlerta(error.message || `Erro ao deletar ${nomeEntidadeApi}`, "error");
      setEstadoAcao((prev) => ({ ...prev, erro: error.message }));
      return { success: false, error: error.message };
    } finally {
      setEstadoAcao((prev) => ({ ...prev, carregando: false }));
    }
  };

  return {
    acoes: {
      criar,
      atualizar,
      deletar: acaoDeletar,
    },
    estadoAcao, // Expõe todo o estado para feedback granular
    estaCarregando: (acao) => estadoAcao.carregando && estadoAcao.acaoAtual === acao,
  };
};
