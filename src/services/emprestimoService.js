import api from "../utils/api";

export const criarEmprestimo = async (dadosEmprestimo) => {
  try {
    const response = await api.post("/emprestimos/funcionario", dadosEmprestimo);
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || error.response?.data?.error || "Erro ao realizar empréstimo.",
    };
  }
};

export const listarTodosEmprestimos = async (filtros, pagina, itensPorPagina) => {
  let urlBase = `emprestimos?pagina=${pagina}&qtdItensPorPagina=${itensPorPagina}`;

  if (filtros.pesquisa) {
    urlBase += `&barraDeBusca=${filtros.pesquisa}`;
  }

  if (filtros.status) {
    urlBase += `&status=${filtros.status}`;
  }

  if (filtros?.clienteId) {
    urlBase += `&clienteId=${filtros.clienteId}`;
  }

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const obterEmprestimoPorId = async (id) => {
  try {
    const response = await api.get(`emprestimos/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Função genérica para mudar o status do empréstimo (renovar, cancelar, retirar)
export const alterarStatusEmprestimo = async (id, acaoEndpoint) => {
  try {
    const response = await api.patch(`/emprestimos/${id}/${acaoEndpoint}`);
    return { error: false, data: response.data };
  } catch (error) {
    const mensagemDoBackend =
      error.response?.data?.mensagem ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Erro ao processar a requisição.";

    return { error: true, message: mensagemDoBackend };
  }
};

export const realizarDevolucaoNaApi = async (id, estadoDevolucao) => {
  try {
    const response = await api.patch(`/emprestimos/${id}/devolver`, { estadoDevolucao });
    return { error: false, data: response.data };
  } catch (error) {
    const mensagemDoBackend =
      error.response?.data?.mensagem || error.response?.data?.error || "Erro ao devolver livro.";

    return { error: true, message: mensagemDoBackend };
  }
};
