const BadgeEstoque = ({ valor }) => {
  // Pega o texto (ex: "3 / 5"), divide no "/", e olha para o primeiro número
  const qtdDisponivel = parseInt(String(valor).split("/")[0].trim());

  // Se a quantidade for zero (ou não for um número válido), consideramos esgotado
  const esgotado = qtdDisponivel === 0 || isNaN(qtdDisponivel);

  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
        esgotado
          ? "bg-red-100 text-red-800 border-red-200" // Vermelho para Esgotado
          : "bg-emerald-100 text-emerald-800 border-emerald-200" // Verde para Disponível
      }`}
    >
      {valor}
    </span>
  );
};

export default BadgeEstoque;
