import api from "../utils/api";

export const getPublishers = async (param, page) => {
  let urlBase = `/livros/atributos/editora?page=${page}`;
  if (param) urlBase += `&nome=${param}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
