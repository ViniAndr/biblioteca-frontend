// Função para formatar telefone visualmente
export const formatarTelefone = (telefone) => {
  return telefone
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta do DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no número
    .slice(0, 15); // Limita a 15 caracteres (incluindo espaço, parênteses e hífen)
};

// Função para formatar CEP
export const formatarCep = (cep) => {
  return cep
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no CEP
    .slice(0, 9); // Limita a 9 caracteres
};

export const formatarLivroParaDashboard = (livro) => ({
  id: livro.id,
  titulo: livro.titulo,
  isbn: livro.isbn,
  autor: livro.autor.nome,
  editora: livro.editora.nome,
  estoque: `${livro.qtdDisponivel}/${livro.qtdCopias}`,
});

export const formatarLivroParaHome = (livro) => ({
  id: livro.id,
  titulo: livro.titulo,
  capa: livro.capaPequena,
  autor: livro.autor.nome,
  totalEmprestimos: livro.totalEmprestimos,
  categoria: livro.categoria,
});

// Formato longo
export const formatarData = (dataString) =>
  new Date(dataString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
