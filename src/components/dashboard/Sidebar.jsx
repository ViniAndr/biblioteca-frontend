import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";

// Components
import SidebarItem from "./SidebarItem";

import {
  LuBookOpen,
  LuUsers,
  LuBookmark,
  LuBuilding2,
  LuUser,
  LuUserCog,
  LuHouse,
  LuLogOut,
  LuLayoutGrid,
} from "react-icons/lu";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: LuBookOpen, text: "Empréstimos", key: "Emprestimos" },
    { icon: LuBookmark, text: "Livros", key: "Livros" },
    { icon: LuUsers, text: "Autores", key: "Autores" },
    { icon: LuBuilding2, text: "Editoras", key: "Editoras" },
    { icon: LuLayoutGrid, text: "Categorias", key: "Categorias" },
    { icon: LuUser, text: "Clientes", key: "Clientes" },
  ];

  const handleHome = () => {
    navigate("/");
  };
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <aside className="fixed w-64 bg-zinc-800 text-white p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-8 text-center">Biblioteca</h1>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              text={item.text}
              active={activeTab === item.key}
              onClick={() => setActiveTab(item.key)}
            />
          ))}
          {user?.role === "admin" && (
            <SidebarItem
              icon={LuUserCog}
              text="Funcionários"
              active={activeTab === "funcionarios"}
              onClick={() => setActiveTab("funcionarios")}
            />
          )}
        </ul>
      </nav>
      <div className="pt-4 mt-auto border-t border-zinc-700">
        <ul className="space-y-2">
          <SidebarItem icon={LuHouse} text="Voltar para Home" onClick={handleHome} />
          <SidebarItem icon={LuLogOut} text="Logout" onClick={handleLogout} />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
