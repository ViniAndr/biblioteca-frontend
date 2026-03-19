const ItemBarraLateral = ({ icon: Icon, texto, ativo, aoClicar }) => {
  return (
    <li
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
        ativo ? "bg-zinc-700 text-white" : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
      }`}
      onClick={aoClicar}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{texto}</span>
    </li>
  );
};

export default ItemBarraLateral;
