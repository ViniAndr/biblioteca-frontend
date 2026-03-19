import { Outlet } from "react-router-dom";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

// Definindo o layout padrão que será usado em várias páginas da aplicação
const LayoutPadrao = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecalho /> {/* Cabeçalho fixo, visível em todas as páginas */}
      <main className="flex-grow">
        <Outlet /> {/* O Outlet será o ponto onde o conteúdo das rotas filhas será injetado */}
      </main>
      <Rodape /> {/* Rodapé fixo, visível em todas as páginas */}
    </div>
  );
};

export default LayoutPadrao;
