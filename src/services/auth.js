import api from "../utils/api";

// Função para login
export const ClientLogin = async (email, password, login) => {
  try {
    const response = await api.post("/clientes/login", { email, senha: password });
    console.log("Response: ", response);
    const { token } = response.data;

    if (token) {
      login(token); // Decodifica e armazena o token no contexto
    }

    return { error: false, message: "Login efetuado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: true, message: error.response.data.error };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
