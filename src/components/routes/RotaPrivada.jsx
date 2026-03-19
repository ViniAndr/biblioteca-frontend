import { Outlet, Navigate } from "react-router-dom";
import { useAutenticacao } from "../../contexts/AutenticacaoContext";

const RotaPrivada = ({ papeisPermitidos, caminhoRedirecionamento = "/login/cliente", children }) => {
  const { autenticado, usuario, carregando } = useAutenticacao();

  if (carregando) {
    return <div>Carregando...</div>; // Enquanto estiver carregando, podemos mostrar um loading
  }

  if (!autenticado) {
    return <Navigate to={caminhoRedirecionamento} replace />;
  }

  // Verifica se a rota exige papéis específicos e se o usuário tem permissão
  if (papeisPermitidos && !papeisPermitidos.includes(usuario?.role)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children ? children : <Outlet />;
};

export default RotaPrivada;
