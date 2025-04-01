import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (authenticated) {
    return <Navigate to="/" />; // Se o usuário estiver logado, redireciona para home
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
