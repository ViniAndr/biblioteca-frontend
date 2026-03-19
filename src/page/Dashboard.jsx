import { useState } from "react";

import BarraLateral from "../components/dashboard/BarraLateral";
import Autores from "../components/dashboard/Autores";
import Categorias from "../components/dashboard/Categorias";
import Clientes from "../components/dashboard/Clientes";
import Editoras from "../components/dashboard/Editoras";
import Emprestimos from "../components/dashboard/Emprestimos";
import Livros from "../components/dashboard/Livros";
import Relatorios from "../components/dashboard/Relatorios";

const Dashboard = () => {
  const [abaAtiva, setAbaAtiva] = useState("Empréstimos");

  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case "Empréstimos":
        return <Emprestimos />;
      case "Livros":
        return <Livros />;
      case "Autores":
        return <Autores />;
      case "Editoras":
        return <Editoras />;
      case "Categorias":
        return <Categorias />;
      case "Clientes":
        return <Clientes />;
      case "Relatorios":
        return <Relatorios />;
      default:
        return <Clientes />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50">
      <div className="w-56 flex-shrink-0">
        <BarraLateral abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        {/* Usamos max-w-7xl para a tabela não esticar infinitamente em monitores gigantes */}
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-4xl mb-6 text-zinc-800">{abaAtiva}</h1>
          <div className="my-5">{renderizarConteudo()}</div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
