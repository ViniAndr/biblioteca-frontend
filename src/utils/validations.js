export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email é obrigatório.";
  if (!regex.test(email)) return "Email inválido.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Senha é obrigatória.";
  if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return null;
};

export const validatePhone = (phone) => {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;

  if (!phone) return "Telefone é obrigatório.";

  if (!regex.test(phone)) return "Telefone inválido. Use o formato (99) 99999-9999.";
  // Remove os caracteres especiais para verificar apenas os números
  const plainPhone = phone.replace(/\D/g, "");

  // Verifica se todos os números são iguais
  if (/^(\d)\1+$/.test(plainPhone)) return "Telefone inválido. Não use todos os dígitos iguais.";
  return null;
};

export const validateRequiredField = (value) => {
  if (!value) return "Esse campo é obrigatório.";
  return null;
};

export const validateHouseNumber = (value) => {
  //
  const regex = /^[0-9]{1,6}[a-zA-Z]{0,4}(\s?\/?\s?[a-zA-Z0-9]{1,4})?$/;

  if (!value) return "O número da casa é obrigatório.";
  if (!regex.test(value)) return "Número da casa inválido.";
  return null;
};

export const validateString = (value) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  if (!value) return "O campo é obrigatório.";
  if (!regex.test(value)) return "Digte apenas letras.";
  return null;
};
