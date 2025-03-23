import api from "../utils/api";

// Função para login
export const ClientLogin = async (email, password, login) => {
  try {
    const response = await api.post("/clientes/login", { email, senha: password });
    const { token } = response.data;

    if (token) {
      login(token); // Decodifica e armazena o token no contexto
    }

    return { error: false, message: response.data.mensagem };
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) {
      return { error: true, message: error.response.data.error };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const handleMigrateAccount = async (clientData) => {
  try {
    const response = await api.post("/clientes/verificar-conta", clientData);
    console.log(response);
    return { error: false, message: "Migração realizada com sucesso, agora pode fazer login." };
  } catch (error) {
    const status = error.response?.status;

    if (status === 404) {
      return {
        error: true,
        message: "Verificamos que você não tem cadastro presencial. Faço o cadastro aqui no site",
      };
    } else if (status === 400) {
      return { error: true, message: "Cliente já cadastrado, tente fazer login" };
    } else if (status === 409) {
      return { error: true, message: "Esse email já está em uso." };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const createOnlineCustomerAccount = async (clientData, login) => {
  console.log(clientData);
  // Backend em português e front no ingles
  const data = {
    nome: clientData.name,
    sobrenome: clientData.lastname,
    email: clientData.email,
    senha: clientData.password,
    telefone: clientData.phone,
    logradouro: clientData.street,
    numero: clientData.number,
    bairro: clientData.neighborhood,
    cidade: clientData.city,
    estado: clientData.state,
    cep: clientData.cep,
  };
  console.log(data);

  try {
    const response = await api.post(`clientes/online`, data);
    console.log(response);
    const { token } = response.data;

    if (token) {
      login(token);
    }

    return { error: false, message: "Cliente cadastrado com sucesso." };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response.data.error;

    if (status === 409) {
      return { error: true, message };
    } else if (status === 400) {
      return { error: true, message };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
