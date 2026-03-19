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
