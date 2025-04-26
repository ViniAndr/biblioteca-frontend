import api from "../utils/api";

export const getAllLoans = async (params, page, itemsPerPage) => {
  let urlBase = `emprestimos?page=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (params && params.book) urlBase += `&livro=${params.book}`;
  if (params && params.status) urlBase += `&status=${params.status}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
