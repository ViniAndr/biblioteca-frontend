import api from "../utils/api";

export const buscarLivroPorIsbnNaApi = async (isbn) => {
  try {
    const response = await api.get(`/livros/google/${isbn}`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Buscar todos os livros para Home e dashboard
export const listarTodosLivros = async (filtros, pagina, itensPorPagina) => {
  let urlBase = `livros?pagina=${pagina}&qtdItensPorPagina=${itensPorPagina}`;
  if (filtros && filtros.pesquisa) urlBase += `&titulo=${filtros.pesquisa}`;
  if (filtros && filtros.autor) urlBase += `&autor=${filtros.autor}`;
  if (filtros && filtros.categoria) urlBase += `&categoria=${filtros.categoria}`;
  if (filtros && filtros.editora) urlBase += `&editora=${filtros.editora}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const obterLivroPorId = async (id) => {
  try {
    const response = await api.get(`/livros/${id}`);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Listar todos atributo(attribute) na dashboard
export const obterDadosAtributo = async (filtros, pagina, itensPorPagina, entidade) => {
  let urlBase = `/livros/atributos/${entidade}?pagina=${pagina}&qtdItensPorPagina=${itensPorPagina}`;

  if (filtros.pesquisa) urlBase += `&nome=${filtros.pesquisa}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const listarTodosAtributos = async () => {
  try {
    const response = await api.get("/livros/atributos");
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

// Listar os tops 10 livros mais emprestados
export const listarLivrosMaisEmprestados = async () => {
  try {
    const response = await api.get("/livros/top-livros");
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const excluirAtributo = async (entidade, id) => {
  const urlBase = `/livros/atributos/${entidade}/${id}/deletar`;

  try {
    const response = await api.delete(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Não apagar o livro, apenas desativar
export const desativarLivro = async (id) => {
  const urlBase = `/livros/${id}/desativar`;

  try {
    const response = await api.patch(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const atualizarAtributo = async (entidade, id, dados) => {
  try {
    const response = await api.put(`/livros/atributos/${entidade}/${id}`, dados);
    return response.data;
  } catch (error) {
    return { error: true, message: error.response?.data || error.message };
  }
};

// Criar livro
export const criarLivro = async (dadosLivro) => {
  const formData = new FormData();

  formData.append("titulo", dadosLivro.titulo);
  formData.append("isbn", dadosLivro.isbn);
  formData.append("qtdCopias", dadosLivro.qtdCopias);
  formData.append("edicao", dadosLivro.edicao);
  formData.append("autorId", dadosLivro.autorId);
  formData.append("editoraId", dadosLivro.editoraId);
  formData.append("numeroPagina", dadosLivro.numeroPagina);
  formData.append("publicadoEm", dadosLivro.publicadoEm);
  formData.append("idioma", dadosLivro.idioma);
  formData.append("descricao", dadosLivro.descricao);
  formData.append("estante", dadosLivro.estante || "");
  formData.append("prateleira", dadosLivro.prateleira || "");

  // Sempre envia capa: File ou URL
  if (dadosLivro.capa instanceof File) {
    formData.append("capa", dadosLivro.capa);
  } else if (typeof dadosLivro.capa === "string") {
    formData.append("capa", dadosLivro.capa);
  }

  // Enviar categorias como array (usando 'categoriaIds[]')
  dadosLivro.categoriaIds.forEach((id) => {
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

export const criarAtributo = async (entidade, dados) => {
  try {
    const response = await api.post(`/livros/atributos/${entidade}`, dados);
    return response;
  } catch (error) {
    if (error.response?.status === 400) {
      return { error: true, message: error.response };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const atualizarLivro = async (id, dadosLivro) => {
  try {
    const formData = new FormData();

    Object.entries(dadosLivro).forEach(([chave, valor]) => {
      if (Array.isArray(valor)) {
        valor.forEach((val) => formData.append(`${chave}[]`, val));
      } else {
        formData.append(chave, valor);
      }
    });

    const response = await api.put(`/livros/${id}`, formData);

    return response.data;
  } catch (error) {
    return { error: true, message: error.response?.data || error.message };
  }
};

export const pesquisarLivrosParaSelect = async (valorDigitado) => {
  try {
    const response = await api.get(`/livros?titulo=${valorDigitado}&qtdItensPorPagina=10`);
    const livros = response.data.livros || response.data;

    return livros.map((livro) => {
      const estoqueTexto = livro.qtdDisponivel > 0 ? `Disp: ${livro.qtdDisponivel}` : `ESGOTADO`;

      return {
        value: livro.id,
        label: `${livro.titulo} (ISBN: ${livro.isbn}) - [${estoqueTexto}]`,
        isDisabled: livro.qtdDisponivel <= 0,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};
