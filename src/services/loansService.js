import api from "../utils/api";

export const getAllLoans = async (filter, page, itemsPerPage) => {
  let urlBase = `emprestimos?pagina=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (filter && filter.book) urlBase += `&livro=${filter.book}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
