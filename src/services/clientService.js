import api from "../utils/api";

// Buscar todos os cliente para a dashboard
export const getAllClients = async (param, page, itemsPerPage) => {
  // O back espera os parametros em português
  let urlBase = `clientes/?pagina=${page}&qtdItensPorPagina=${itemsPerPage}`;

  // Caso tenha filtro de nome, adiciona o parâmetro
  if (param) urlBase += `&nomeCliente=${param}`;

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
