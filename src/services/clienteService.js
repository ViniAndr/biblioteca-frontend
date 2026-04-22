import api from "../utils/api";

// Buscar todos os cliente para a dashboard
export const listarTodosClientes = async (filtros, pagina, itensPorPagina) => {
  let urlBase = `clientes/?pagina=${pagina}&qtdItensPorPagina=${itensPorPagina}`;

  if (filtros.pesquisa) urlBase += `&nomeCliente=${filtros.pesquisa}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 404) {
      return { error: true, message: error.response };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const obterClientePorId = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    const mensagem = error.response?.data?.message || "Erro ao buscar detalhes.";
    return { error: true, message: mensagem };
  }
};

// Criar um novo cliente
export const criarCliente = async (dadosCliente) => {
  try {
    const response = await api.post("/clientes/presencial", dadosCliente);
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.mensagem || error.response?.data?.erro || "Erro ao criar cliente",
    };
  }
};

// Atualizar um cliente (pelo funcionário)
export const atualizarCliente = async (id, dadosCliente) => {
  try {
    const response = await api.put(`/clientes/${id}`, dadosCliente);
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.mensagem || error.response?.data?.error || "Erro ao atualizar cliente",
    };
  }
};

export const pesquisarClientesParaSelect = async (valorDigitado) => {
  try {
    const response = await api.get(`/clientes?nomeCliente=${valorDigitado}&qtdItensPorPagina=10`);
    return response.data.clientes.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} - (Tel: ${cliente.telefone})`,
    }));
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
};

// Busca os dados do próprio cliente logado
export const obterPerfilCliente = async () => {
  try {
    const response = await api.get("/clientes/perfil");
    return { error: false, data: response.data };
  } catch (error) {
    const mensagemDoBackend =
      error.response?.data?.mensagem || error.response?.data?.error || "Erro ao carregar perfil do cliente.";

    return { error: true, message: mensagemDoBackend };
  }
};

// Atualiza dados básicos e endereço do próprio cliente
export const atualizarPerfilCliente = async (dados) => {
  try {
    const response = await api.put("/clientes/perfil", dados);
    return { error: false, data: response.data };
  } catch (error) {
    console.log(error);
    const mensagemDoBackend =
      error.response?.data?.mensagem || error.response?.data?.error || "Erro ao atualizar perfil.";
    return {
      error: true,
      message: mensagemDoBackend,
    };
  }
};

// Rota para alteração de senha (assumindo que seu backend trate isso ou trate no atualizarPerfil)
export const alterarSenhaCliente = async (senhas) => {
  try {
    // Se o seu backend usar a mesma rota de perfil para senha:
    const response = await api.put("/clientes/perfil", senhas);
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.mensagem || "Senha atual incorreta ou erro no servidor.",
    };
  }
};
