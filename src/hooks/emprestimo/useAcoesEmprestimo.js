import { useState } from "react";
import { useAlerta } from "../../contexts/AlertaContext";
import {
  obterEmprestimoPorId,
  criarEmprestimo,
  alterarStatusEmprestimo,
  realizarDevolucaoNaApi,
} from "../../services/emprestimoService";

export const useAcoesEmprestimo = () => {
  const { mostrarAlerta } = useAlerta();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [acaoAtual, setAcaoAtual] = useState(null);
  const [erro, setErro] = useState(null);

  const criar = async (dadosEmprestimo) => {
    try {
      setCarregando(true);
      setAcaoAtual("criar");
      setErro(null);

      const resultado = await criarEmprestimo(dadosEmprestimo);
      if (resultado.error) throw new Error(resultado.message);

      mostrarAlerta("Empréstimo realizado com sucesso!", "success");
      return { success: true };
    } catch (err) {
      const mensagem = err.message || "Erro ao realizar empréstimo.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
      return { success: false, error: mensagem };
    } finally {
      setCarregando(false);
    }
  };

  const visualizarDetalhes = async (id) => {
    try {
      setCarregando(true);
      setAcaoAtual("visualizar");
      setErro(null);

      const resultado = await obterEmprestimoPorId(id);
      if (resultado.error) throw new Error(resultado.message?.data?.error || resultado.message);

      setDados(resultado.data);
    } catch (err) {
      const mensagem = err.message || "Erro ao buscar detalhes do empréstimo.";
      setErro(mensagem);
      mostrarAlerta(mensagem, "error");
    } finally {
      setCarregando(false);
    }
  };

  const executarAcao = async (id, acaoEndpoint, mensagemSucesso) => {
    try {
      setCarregando(true);
      const resultado = await alterarStatusEmprestimo(id, acaoEndpoint);

      if (resultado.error) throw new Error(resultado.message);

      mostrarAlerta(mensagemSucesso, "success");

      await visualizarDetalhes(id);

      return { success: true };
    } catch (err) {
      const mensagem = err.message || "Erro ao executar ação.";
      mostrarAlerta(mensagem, "error");
      return { success: false, error: mensagem };
    } finally {
      setCarregando(false);
    }
  };

  // Funções mastigadas prontas para os botões usarem
  const confirmarRetirada = (id) => executarAcao(id, "retirar", "Retirada confirmada com sucesso!");
  const cancelarEmprestimo = (id) => executarAcao(id, "cancelar", "Empréstimo cancelado.");
  const renovarEmprestimo = (id) => executarAcao(id, "renovar", "Empréstimo renovado com sucesso!");

  const devolverEmprestimo = async (id, estadoDevolucao) => {
    try {
      setCarregando(true);
      const resultado = await realizarDevolucaoNaApi(id, estadoDevolucao);

      if (resultado.error) throw new Error(resultado.message);

      mostrarAlerta("Livro devolvido com sucesso!", "success");

      await visualizarDetalhes(id);

      return { success: true };
    } catch (err) {
      const mensagem = err.message || "Erro ao devolver livro.";
      mostrarAlerta(mensagem, "error");
      return { success: false, error: mensagem };
    } finally {
      setCarregando(false);
    }
  };

  return {
    criar,
    visualizarDetalhes,
    dados,
    confirmarRetirada,
    cancelarEmprestimo,
    renovarEmprestimo,
    devolverEmprestimo,
    erro,
    carregando,
    acaoAtual,
    estaCarregando: (acao) => carregando && acaoAtual === acao,
  };
};
