import { createBrowserRouter } from "react-router-dom";

// Layout
import DefaultLayout from "./components/layout/DefaultLayout";
import NoLayout from "./components/layout/NoLayout";

// Protetor de rotas
import PrivateRoute from "./components/routes/PrivateRoute";

// Page
import Home from "./page/Home";
import ClientLogin from "./page/auth/ClientLogin";
import MigrateAccount from "./page/auth/MigrateAccount";
import Register from "./page/auth/Register";
import Dashboard from "./page/Dashboard";
import EmployeeAdminLogin from "./page/auth/LoginEmployeeAndAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    // Define as rotas filhas dentro dessa rota principal
    children: [
      {
        index: true, // Rota padrão para a página inicial ("/")
        element: <Home />, // Componente a ser renderizado na rota "/"
      },
      {
        path: "/login/cliente",
        element: <ClientLogin />,
      },
      {
        path: "/migrar-conta",
        element: <MigrateAccount />,
      },
      {
        path: "/cliente/cadastrar-conta",
        element: <Register />,
      },
      {
        path: "/login/area-restrita",
        element: <EmployeeAdminLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <NoLayout />,
    children: [
      {
        path: "/dashboard/funcionario",
        element: (
          <PrivateRoute allowedRoles={["funcionario", "admin"]} redirectPath="/login/area-restrita">
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
