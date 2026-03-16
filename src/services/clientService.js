import api from "../utils/api";

// Buscar todos os cliente para a dashboard
export const getAllClients = async (filter, page, itemsPerPage) => {
  // O back espera os parametros em português
  let urlBase = `clientes/?pagina=${page}&qtdItensPorPagina=${itemsPerPage}`;

  // Caso tenha filtro de nome, adiciona o parâmetro
  if (filter.search) urlBase += `&nomeCliente=${filter.search}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 404) {
      return { error: true, message: error.response };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Criar um novo cliente
export const createClient = async (clientData) => {
  try {
    const response = await api.post("/clientes/presencial", clientData);
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.mensagem || error.response?.data?.erro || "Erro ao criar cliente",
    };
  }
};
