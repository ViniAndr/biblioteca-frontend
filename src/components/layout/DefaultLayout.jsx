import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Definindo o layout padrão que será usado em várias páginas da aplicação
const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Cabeçalho fixo, visível em todas as páginas */}
      <main className="flex-grow">
        <Outlet /> {/* O Outlet será o ponto onde o conteúdo das rotas filhas será injetado */}
      </main>
      <Footer /> {/* Rodapé fixo, visível em todas as páginas */}
    </div>
  );
};

export default DefaultLayout;
