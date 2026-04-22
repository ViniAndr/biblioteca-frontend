import Carregamento from "../components/common/Carregamento";

import { useAutenticacao } from "../contexts/AutenticacaoContext";

// Páginas de cada tipo de usuário
import PerfilFuncionario from "./perfil/PerfilFuncionario";
import PerfilCliente from "./perfil/PerfilCliente";

const Perfil = () => {
  const { usuario } = useAutenticacao();

  if (!usuario) return <Carregamento texto="Carregando..." />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">Minha Conta</h1>

      {/* <div className="bg-white rounded-xl shadow-sm border border-zinc-200 min-h-[60vh]"> */}
      <div className="bg-white  min-h-[60vh]">
        {usuario.role === "funcionario" && <PerfilFuncionario usuario={usuario} />}
        {usuario.role === "cliente" && <PerfilCliente usuario={usuario} />}

        {/* Futuras implementações: */}
        {/* {usuario.role === "admin" && <PerfilAdmin usuario={usuario} />} */}
      </div>
    </div>
  );
};

export default Perfil;
