import api from "../utils/api";

export const obterMeuPerfil = async () => {
  try {
    const response = await api.get("/funcionarios/perfil");
    return { data: response.data, erro: null };
  } catch (error) {
    return {
      data: null,
      erro: error.response?.data?.error || "Erro ao carregar os dados do perfil.",
    };
  }
};

export const atualizarPerfilFuncionario = async (dados) => {
  try {
    const response = await api.put("/funcionarios/perfil", dados);
    return { data: response.data, erro: null };
  } catch (error) {
    return {
      data: null,
      erro: error.response?.data?.error || "Erro inesperado ao atualizar o perfil.",
    };
  }
};
