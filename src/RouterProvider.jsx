import { createBrowserRouter } from "react-router-dom";

// Layout
import DefaultLayout from "./components/layout/DefaultLayout";

// Page
import Home from "./page/Home";

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
    ],
  },
]);

export default router;
