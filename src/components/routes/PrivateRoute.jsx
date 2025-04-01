import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ allowedRoles, redirectPath = "/login/cliente", children }) => {
  const { authenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Enquanto estiver carregando, podemos mostrar um loading
  }

  if (!authenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
