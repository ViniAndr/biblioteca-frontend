import api from "../utils/api";

// Função para login
export const fazerLoginUsuario = async (email, senha, loginContexto, entidade) => {
  let rotaCorreta = "/clientes/login";

  if (entidade && entidade === "funcionario") rotaCorreta = "/funcionarios/login";
  else if (entidade && entidade === "admin") rotaCorreta = "/admin/login";

  try {
    const response = await api.post(rotaCorreta, { email, senha });
    const { token } = response.data;

    if (token) {
      loginContexto(token); // Decodifica e armazena o token no contexto
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
export const migrarContaCliente = async (dadosCliente) => {
  const dados = {
    email: dadosCliente.email,
    senha: dadosCliente.senha,
    telefone: dadosCliente.telefone,
  };
  try {
    await api.post("/clientes/verificar-conta", dados);
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
export const criarContaOnlineCliente = async (dadosCliente, loginContexto) => {
  const dados = {
    nome: dadosCliente.nome,
    sobrenome: dadosCliente.sobrenome,
    email: dadosCliente.email,
    senha: dadosCliente.senha,
    telefone: dadosCliente.telefone,
    logradouro: dadosCliente.logradouro,
    numero: dadosCliente.numero,
    bairro: dadosCliente.bairro,
    cidade: dadosCliente.cidade,
    estado: dadosCliente.estado,
    cep: dadosCliente.cep,
  };

  try {
    const response = await api.post(`clientes/online`, dados);
    const { token } = response.data;

    if (token) {
      loginContexto(token);
    }

    return { error: false, message: response.data.mensagem };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data.error;

    if (status === 409 || status === 400) {
      return { error: true, message };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};