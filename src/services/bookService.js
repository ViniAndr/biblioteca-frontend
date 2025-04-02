import api from "../utils/api";

export const getAllBooks = async (params, page, itemsPerPage) => {
  let urlBase = `livros?page=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (params && params.title) urlBase += `&titulo=${params.title}`;
  if (params && params.author) urlBase += `&autor=${params.author}`;
  if (params && params.category) urlBase += `&categoria=${params.category}`;
  if (params && params.publisher) urlBase += `&editora=${params.publisher}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

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
