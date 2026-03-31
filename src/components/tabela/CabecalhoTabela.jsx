const CabecalhoTabela = ({ colunas }) => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {colunas.map((coluna, index) => {
          // Por padrão, as colunas do meio dividem o espaço igualmente
          let larguraCSS = "w-auto";

          // Regra Genérica 1: A primeira coluna (contador) é sempre pequena
          if (index === 0 && coluna === "#") {
            larguraCSS = "w-12 sm:w-16"; // Fixo em torno de 48px a 64px
          }
          // Regra Genérica 2: A última coluna (geralmente Ações) recebe largura fixa para os botões não espremerem
          else if (index === colunas.length - 1 && coluna === "") {
            larguraCSS = "w-28 sm:w-32"; // Fixo para caber os 3 ícones sem quebrar linha
          }

          return (
            <th
              key={index}
              className={`px-3 py-3 text-sm font-semibold text-gray-600 truncate ${larguraCSS}`}
              title={coluna}
            >
              {coluna}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CabecalhoTabela;
