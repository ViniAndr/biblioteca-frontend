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
