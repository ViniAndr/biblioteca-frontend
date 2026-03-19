import { Link, useNavigate } from "react-router-dom";

// Context
import { useAutenticacao } from "../../contexts/AutenticacaoContext";

// Components
import Botao from "../common/Botao";

// Icons
import { PiBookOpenLight } from "react-icons/pi";

const Cabecalho = () => {
  const { usuario, logout } = useAutenticacao();
  const navigate = useNavigate();

  const navegarPara = (caminho) => {
    navigate(caminho);
  };

  const lidarComLogout = () => {
    logout();
    navigate("/"); // Redireciona para home após logout
  };

  return (
    <header className="border-b-1 border-zinc-200 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className=" flex gap-2 items-center font-bold text-2xl ">
          <PiBookOpenLight className="h-6 w-6" />
          Biblioteca
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/livros" className="text-sm font-medium transition-colors hover:text-primary">
            Ver Todos os Livros
          </Link>
          <Link to="/categorias" className="text-sm font-medium transition-colors hover:text-primary">
            Categorias
          </Link>
          <Link to="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
            Sobre Nós
          </Link>
        </nav>

        <div>
          {usuario ? (
            <div className="flex gap-2">
              {/* Mostrar diferentes opções com base no usuario.role */}
              {usuario.role === "cliente" && (
                <>
                  <Botao variante="ghost" onClick={() => navegarPara("/profile/cliente")}>
                    Meu Perfil
                  </Botao>
                </>
              )}

              {usuario.role === "funcionario" && (
                <Botao variante="ghost" onClick={() => navegarPara("/dashboard/funcionario")}>
                  Dashboard
                </Botao>
              )}

              {usuario.role === "admin" && <Botao onClick={() => navegarPara("/dashboard/admin")}>Dashboard</Botao>}

              {/* Botão de logout comum para todos */}
              <Botao onClick={lidarComLogout}>Sair</Botao>
            </div>
          ) : (
            <div className="flex gap-2">
              <Botao onClick={() => navegarPara("/cliente/cadastrar-conta")}>Cadastrar</Botao>
              <Botao onClick={() => navegarPara("/login/cliente")}>Entrar</Botao>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
