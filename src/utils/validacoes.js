export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email é obrigatório.";
  if (!regex.test(email)) return "Email inválido.";
  return null;
};

export const validarSenha = (senha) => {
  if (!senha) return "Senha é obrigatória.";
  if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return null;
};

export const validarTelefone = (telefone) => {
  if (!telefone) return "Telefone é obrigatório.";

  // Remove parênteses, traços e espaços para contar só os números
  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length !== 11) {
    return "O telefone deve ter 11 dígitos (com DDD).";
  }

  // Verifica se o terceiro dígito (índice 2) é o 9
  if (numeros[2] !== "9") {
    return "Celular inválido: o primeiro dígito após o DDD deve ser 9.";
  }

  return null; // Validação passou!
};

export const validarCampoObrigatorio = (valor) => {
  if (!valor) return "Esse campo é obrigatório.";
  return null;
};

export const validarNumeroCasa = (valor) => {
  // Se o campo estiver vazio, retorna null (tudo certo, não tem erro)
  if (!valor || valor.trim() === "") {
    return null;
  }

  // Libera o uso explícito de "Sem Número" no padrão brasileiro
  const valorLimpo = valor.trim().toUpperCase();
  if (valorLimpo === "SN" || valorLimpo === "S/N" || valorLimpo === "SEM NÚMERO") {
    return null;
  }

  // Se o usuário digitou algo diferente de SN, validamos com a sua Regex original
  const regex = /^[0-9]{1,6}[a-zA-Z]{0,4}(\s?\/?\s?[a-zA-Z0-9]{1,4})?$/;

  if (!regex.test(valor)) {
    return "Número inválido. Digite um número, 'SN' ou deixe em branco.";
  }

  return null;
};

export const validarTexto = (valor) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  if (!valor) return "O campo é obrigatório.";
  if (!regex.test(valor)) return "Digite apenas letras.";
  return null;
};

export const validarInteiroPositivo = (valor) => {
  if (!valor || isNaN(valor)) return "Campo obrigatório.";
  if (valor <= 0) return "Deve ser um número positivo.";
  return null;
};

export const validarISBN = (valor) => {
  if (!valor) return "ISBN é obrigatório.";
  if (valor.length > 13) return "ISBN deve ter no máximo 13 caracteres.";
  if (!/^\d{10,13}$/.test(valor)) return "ISBN inválido. Use apenas números (10 ou 13 dígitos)";
  return null;
};

export const validarCampoSelect = (valor) => {
  if (!valor || valor === 0 || valor === "") return "Seleção obrigatória.";
  return null;
};

export const validarArrayObrigatorio = (valor) => {
  if (!valor || valor.length === 0) {
    return "Selecione pelo menos uma opção";
  }
  return null;
};
