const SidebarItem = ({ icon: Icon, text, active, onClick }) => {
  return (
    <li
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
        active ? "bg-zinc-700 text-white" : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{text}</span>
    </li>
  );
};

export default SidebarItem;
