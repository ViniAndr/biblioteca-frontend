import { LuSearch } from "react-icons/lu";

const Search = ({ value, handleSearch }) => {
  return (
    <div className="h-10 min-w-72 flex justify-between items-center rounded-lg border border-gray-300 shadow-sm p-2 flex-1">
      <input
        type="text"
        value={value} // Acessa a propriedade nome do filtro
        onChange={(e) => handleSearch(e.target.value)} // Passa apenas o valor
        placeholder="Pesquisar..."
        className="outline-none w-full"
      />
      <LuSearch className="text-zinc-500" />
    </div>
  );
};

export default Search;
