import api from "../utils/api";

// Função para login
export const UserLogin = async (email, password, login, entity) => {
  let rightRoute = "/clientes/login";

  if (entity && entity == "employee") rightRoute = "/funcionarios/login";
  else if (entity && entity == "admin") rightRoute = "/admin/login";

  try {
    const response = await api.post(rightRoute, { email, senha: password });
    const { token } = response.data;

    if (token) {
      login(token); // Decodifica e armazena o token no contexto
    }

    return { error: false, message: response.data.mensagem };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data.error;
    if (status === 401) {
      return { error: true, message };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Cliente pode transformar sua conta local para online
export const handleMigrateAccount = async (clientData) => {
  // Backend em português e front no ingles
  const data = {
    email: clientData.email,
    senha: clientData.password,
    telefone: clientData.phone,
  };
  try {
    await api.post("/clientes/verificar-conta", data);
    return { error: false, message: "Migração realizada com sucesso, agora pode fazer login." };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data.error;

    if (status === 404 || status === 400 || status === 409) {
      return { error: true, message };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

// Cliente pode se cadastrar
export const createOnlineCustomerAccount = async (clientData, login) => {
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

  try {
    const response = await api.post(`clientes/online`, data);
    const { token } = response.data;

    if (token) {
      login(token);
    }

    return { error: false, message: response.data.mensagem };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response.data.error;

    if (status === 409 || status === 400) {
      return { error: true, message };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
