const SeletorItensPorPagina = ({ itensPorPagina, setItensPorPagina }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="itensPorPagina" className="mr-2 text-xs font-medium text-gray-500 uppercase">
        Itens por página:
      </label>
      <select
        id="itensPorPagina"
        value={itensPorPagina}
        onChange={(e) => setItensPorPagina(Number(e.target.value))}
        className="border rounded px-0.5 border-zinc-400 outline-0 text-sm font-medium text-gray-500 uppercase"
      >
        {[5, 10, 15, 20, 25].map((numero) => (
          <option key={numero} value={numero}>
            {numero}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeletorItensPorPagina;
