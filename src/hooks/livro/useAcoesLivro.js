import { useState } from "react";
import { useAlerta } from "../../contexts/AlertaContext";
import {
  criarLivro,
  buscarLivroPorIsbnNaApi,
  obterLivroPorId,
  desativarLivro,
  atualizarLivro,
} from "../../services/livroService";

export const useAcoesLivro = () => {
  const { mostrarAlerta } = useAlerta();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [acaoAtual, setAcaoAtual] = useState(null);
  const [erro, setErro] = useState(null);

  const criar = async (dadosLivro) => {
    try {
      setCarregando(true);
      setAcaoAtual("criar");
      setErro(null);

      const resultado = await criarLivro(dadosLivro);
      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);
    } catch (err) {
      const mensagem = err.message || "Erro ao buscar detalhes do livro.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
    } finally {
      setCarregando(false);
    }
  };

  const atualizar = async (id, dadosLivro) => {
    try {
      setCarregando(true);
      setAcaoAtual("atualizar");
      setErro(null);

      const resultado = await atualizarLivro(id, dadosLivro);
      if (resultado.error) throw new Error(resultado.message?.error || "Erro ao atualizar");

      mostrarAlerta("Livro atualizado com sucesso!", "success");
      return true; // Retorna true para o modal saber que deu certo e pode fechar
    } catch (err) {
      const mensagem = err.message || "Erro ao atualizar os detalhes do livro.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
      throw err; // Lança o erro para o Modal não fechar se der ruim
    } finally {
      setCarregando(false);
    }
  };

  const buscarNaApiGoogle = async (isbn) => {
    try {
      setCarregando(true);
      setAcaoAtual("buscarApi");
      setErro(null);

      const response = await buscarLivroPorIsbnNaApi(isbn);
      setDados(response.data);
      return response;
    } catch (err) {
      const mensagem = err.message || "Erro ao buscar detalhes do livro.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
    } finally {
      setCarregando(false);
    }
  };

  const visualizarDetalhes = async (id) => {
    try {
      setCarregando(true);
      setAcaoAtual("visualizar");
      setErro(null);

      const resultado = await obterLivroPorId(id);
      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      setDados(resultado.data);
      return resultado;
    } catch (err) {
      const mensagem = err.message || "Erro ao buscar detalhes do livro.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
    } finally {
      setCarregando(false);
    }
  };

  const acaoDeletar = async (id) => {
    try {
      setCarregando(true);
      setAcaoAtual("deletar");
      setErro(null);

      const resultado = await desativarLivro(id);
      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      mostrarAlerta("Livro deletado com sucesso!", "success");
    } catch (err) {
      const mensagem = err.message || "Erro ao deletar esse livro.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
    } finally {
      setCarregando(false);
    }
  };

  return {
    visualizarDetalhes,
    deletarLivro: acaoDeletar,
    buscarNaApiGoogle,
    criar,
    atualizar,
    livro: dados,
    erro,
    carregando,
    acaoAtual,
    estaCarregando: (acao) => carregando && acaoAtual === acao,
  };
};
