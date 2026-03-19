import { Outlet, Navigate } from "react-router-dom";
import { useAutenticacao } from "../../contexts/AutenticacaoContext";

const RotaPublica = ({ children }) => {
  const { autenticado, carregando } = useAutenticacao();

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (autenticado) {
    return <Navigate to="/" />; // Se o usuário já estiver logado, redireciona para a home
  }

  return children ? children : <Outlet />;
};

export default RotaPublica;
