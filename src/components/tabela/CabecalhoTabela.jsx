const CabecalhoTabela = ({ colunas }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        {colunas.map((coluna, index) => (
          <th key={index} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left">
            {coluna}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CabecalhoTabela;
