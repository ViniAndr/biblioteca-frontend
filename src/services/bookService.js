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
  const formData = new FormData();

  formData.append("titulo", dataBook.titulo);
  formData.append("isbn", dataBook.isbn);
  formData.append("qtdCopias", dataBook.qtdCopias);
  formData.append("edicao", dataBook.edicao);
  formData.append("autorId", dataBook.autorId);
  formData.append("editoraId", dataBook.editoraId);
  formData.append("numeroPagina", dataBook.numeroPagina);
  formData.append("publicadoEm", dataBook.publicadoEm);
  formData.append("idioma", dataBook.idioma);
  formData.append("descricao", dataBook.descricao);

  // Sempre envia capa: File ou URL
  if (dataBook.capa instanceof File) {
    formData.append("capa", dataBook.capa);
  } else if (typeof dataBook.capa === "string") {
    formData.append("capa", dataBook.capa);
  }

  // Enviar categorias como array (usando 'categoriaIds[]')
  dataBook.categoriaIds.forEach((id) => {
    formData.append("categoriaIds[]", id);
  });

  try {
    const response = await api.post("/livros", formData);
    return response;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const createAttribute = async (entity, data) => {
  try {
    const response = await api.post(`/livros/atributos/${entity}`, data);
    return response;
  } catch (error) {
    if (error.response?.status === 400) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const formData = new FormData();

    // Transforma o objeto em FormData para suportar envio de fotos
    Object.entries(bookData).forEach(([key, value]) => {
      // Se for o array de categorias, manda cada ID separado
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(`${key}[]`, val));
      } else {
        formData.append(key, value);
      }
    });

    const response = await api.put(`/livros/${id}`, formData);

    return response.data;
  } catch (error) {
    return { error: true, message: error.response?.data || error.message };
  }
};
