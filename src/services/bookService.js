import api from "../utils/api";

export const getAttributeData = async (param, page, itemsPerPage, entity) => {
  let urlBase = `/livros/atributos/${entity}?page=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (param) urlBase += `&nome=${param}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
