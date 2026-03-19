import { useNavigate } from "react-router-dom";

// Context
import { useAutenticacao } from "../../contexts/AutenticacaoContext";

// Components
import ItemBarraLateral from "./ItemBarraLateral";

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

const BarraLateral = ({ abaAtiva, setAbaAtiva }) => {
  const { logout, usuario } = useAutenticacao();
  const navigate = useNavigate();

  const itensBarraLateral = [
    { icon: LuBookOpen, text: "Empréstimos", key: "Empréstimos" },
    { icon: LuBookmark, text: "Livros", key: "Livros" },
    { icon: LuUsers, text: "Autores", key: "Autores" },
    { icon: LuBuilding2, text: "Editoras", key: "Editoras" },
    { icon: LuLayoutGrid, text: "Categorias", key: "Categorias" },
    { icon: LuUser, text: "Clientes", key: "Clientes" },
    { icon: LuLogOut, text: "Relatorios", key: "Relatorios" },
  ];

  const lidarComHome = () => {
    navigate("/");
  };
  const lidarComLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <aside className="bg-zinc-800 text-white p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-8 text-center">Biblioteca</h1>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {itensBarraLateral.map((item) => (
            <ItemBarraLateral
              key={item.key}
              icon={item.icon}
              texto={item.text}
              ativo={abaAtiva === item.key}
              aoClicar={() => setAbaAtiva(item.key)}
            />
          ))}
          {usuario?.role === "admin" && (
            <ItemBarraLateral
              icon={LuUserCog}
              texto="Funcionários"
              ativo={abaAtiva === "funcionarios"}
              aoClicar={() => setAbaAtiva("funcionarios")}
            />
          )}
        </ul>
      </nav>
      <div className="pt-4 mt-auto border-t border-zinc-700">
        <ul className="space-y-2">
          <ItemBarraLateral icon={LuHouse} texto="Voltar para Home" aoClicar={lidarComHome} />
          <ItemBarraLateral icon={LuLogOut} texto="Logout" aoClicar={lidarComLogout} />
        </ul>
      </div>
    </aside>
  );
};

export default BarraLateral;
