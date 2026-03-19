import { LuSearch } from "react-icons/lu";

const Pesquisa = ({ valor, onChange, placeholder = "Pesquisar..." }) => {
  return (
    <div className="h-10 min-w-72 flex justify-between items-center rounded-lg border border-gray-300 shadow-sm p-2 flex-1">
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="outline-none w-full"
      />
      <LuSearch className="text-zinc-500" />
    </div>
  );
};

export default Pesquisa;
