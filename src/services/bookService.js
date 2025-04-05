import api from "../utils/api";

// Buscar todos os livros para Home e dashboard
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

// Listar todos atributo(attribute) na dashboard
export const getAttributeData = async (param, page, itemsPerPage, attribute) => {
  let urlBase = `/livros/atributos/${attribute}?page=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (param) urlBase += `&nome=${param}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Listar os tops 10 livros mais emprestados
export const getTopBooks = async () => {
  try {
    const response = await api.get("/livros/top-livros");
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
