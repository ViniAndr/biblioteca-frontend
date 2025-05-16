import api from "../utils/api";

export const findAPI = async (isbn) => {
  try {
    const response = await api.get(`/livros/google/${isbn}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Buscar todos os livros para Home e dashboard
export const getAllBooks = async (filter, page, itemsPerPage) => {
  let urlBase = `livros?pagina=${page}&qtdItensPorPagina=${itemsPerPage}`;
  if (filter && filter.search) urlBase += `&titulo=${filter.search}`;
  if (filter && filter.author) urlBase += `&autor=${filter.author}`;
  if (filter && filter.category) urlBase += `&categoria=${filter.category}`;
  if (filter && filter.publisher) urlBase += `&editora=${filter.publisher}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/livros/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 400 || error.response.status == 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Listar todos atributo(attribute) na dashboard
export const getAttributeData = async (filter, page, itemsPerPage, entity) => {
  let urlBase = `/livros/atributos/${entity}?pagina=${page}&qtdItensPorPagina=${itemsPerPage}`;

  if (filter.search) urlBase += `&nome=${filter.search}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getAllAttributs = async () => {
  try {
    const response = await api.get("/livros/atributos");
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

export const deleteAttribute = async (entity, id) => {
  const urlBase = `/livros/atributos/${entity}/${id}/deletar`;

  try {
    const response = await api.delete(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 400 || error.response.status == 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Não apagar o livro, apenas desativar
export const deleteBook = async (id) => {
  const urlBase = `/livros/${id}/desativar`;

  try {
    const response = await api.patch(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 400 || error.response.status == 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Criar livro
export const createBook = async (dataBook) => {
  try {
    const response = await api.post("/livros", dataBook);
    return response;
  } catch (error) {
    if (error.response.status == 400 || error.response.status == 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
