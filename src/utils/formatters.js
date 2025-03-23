// Função para formatar telefone visualmente
export const formatPhone = (phone) => {
  return phone
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta do DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no número
    .slice(0, 15); // Limita a 15 caracteres (incluindo espaço, parênteses e hífen)
};

// Função para formatar CEP
export const formatCep = (cep) => {
  return cep
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no CEP
    .slice(0, 9); // Limita a 9 caracteres
};
