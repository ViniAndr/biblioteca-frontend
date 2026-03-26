import { createBrowserRouter } from "react-router-dom";

// Layout
import LayoutPadrao from "./components/layout/LayoutPadrao";
import SemLayout from "./components/layout/SemLayout";

// Protetor de rotas
import RotaPrivada from "./components/routes/RotaPrivada";
import RotaPublica from "./components/routes/RotaPublica";

// Page
import Home from "./page/Home";
import LoginCliente from "./page/auth/LoginCliente";
import MigrarConta from "./page/auth/MigrarConta";
import Cadastro from "./page/auth/Cadastro";
import LoginFuncionarioEAdmin from "./page/auth/LoginFuncionarioEAdmin";
import Dashboard from "./page/Dashboard";
import Perfil from "./page/Perfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPadrao />,
    // Define as rotas filhas dentro dessa rota principal
    children: [
      {
        index: true, // Rota padrão para a página inicial ("/")
        element: <Home />, // Componente a ser renderizado na rota "/"
      },
      {
        path: "/login/cliente",
        element: (
          <RotaPublica>
            <LoginCliente />
          </RotaPublica>
        ),
      },
      {
        path: "/migrar-conta",

        element: (
          <RotaPublica>
            <MigrarConta />
          </RotaPublica>
        ),
      },
      {
        path: "/cliente/cadastrar-conta",
        element: (
          <RotaPublica>
            <Cadastro />
          </RotaPublica>
        ),
      },
      {
        path: "/login/area-restrita",
        element: (
          <RotaPublica>
            <LoginFuncionarioEAdmin />
          </RotaPublica>
        ),
      },
      {
        path: "/perfil",
        element: (
          <RotaPrivada papeisPermitidos={["cliente", "funcionario", "admin"]} caminhoRedirecionamento="/">
            <Perfil />
          </RotaPrivada>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <SemLayout />,
    children: [
      {
        path: "/dashboard/funcionario",
        element: (
          <RotaPrivada allowedRoles={["funcionario", "admin"]} redirectPath="/login/area-restrita">
            <Dashboard />
          </RotaPrivada>
        ),
      },
    ],
  },
]);

export default router;
