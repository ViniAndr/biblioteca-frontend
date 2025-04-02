import { LuSearch } from "react-icons/lu";

const Search = ({ value, handleSearch }) => {
  return (
    <div className={"min-w-72 flex justify-between items-center rounded-lg border border-gray-300 shadow-sm p-2"}>
      <input type="text" value={value} onChange={handleSearch} placeholder="Pesquisar..." className="outline-none w-full" />
      <LuSearch className="text-zinc-500" />
    </div>
  );
};

export default Search;
