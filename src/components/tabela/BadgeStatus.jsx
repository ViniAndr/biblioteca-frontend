const BadgeStatus = ({ status }) => {
  // Mapeamento de cores baseado no status
  const estilos = {
    SOLICITADO: "bg-blue-100 text-blue-800 border-blue-200",
    EMPRESTADO: "bg-yellow-100 text-yellow-800 border-yellow-200",
    ATRASADO: "bg-red-100 text-red-800 border-red-200",
    DEVOLVIDO: "bg-green-100 text-green-800 border-green-200",
    CANCELADO: "bg-gray-100 text-gray-800 border-gray-200",
  };

  // Se o status não existir no objeto acima, usa um padrão cinza
  const corPadrao = estilos[status] || "bg-zinc-100 text-zinc-800 border-zinc-200";

  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${corPadrao}`}>{status}</span>;
};

export default BadgeStatus;
