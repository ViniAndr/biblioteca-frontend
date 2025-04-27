import { Link, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";

// Components
import Button from "../common/Button";

// Icons
import { PiBookOpenLight } from "react-icons/pi";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
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
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/livros" className="text-sm font-medium transition-colors hover:text-primary">
            Ver Todos os Livros
          </Link>
          <Link href="/categorias" className="text-sm font-medium transition-colors hover:text-primary">
            Categorias
          </Link>
          <Link href="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
            Sobre Nós
          </Link>
        </nav>

        <div>
          {user ? (
            <div className="flex gap-2">
              {/* Mostrar diferentes opções com base no user.role */}
              {user.role === "cliente" && (
                <>
                  <Button variant="ghost" onClick={() => handleNavigation("/profile/cliente")}>
                    Meu Perfil
                  </Button>
                </>
              )}

              {user.role === "funcionario" && (
                <Button variant="ghost" onClick={() => handleNavigation("/dashboard/funcionario")}>
                  Dashboard
                </Button>
              )}

              {user.role === "admin" && <Button onClick={() => handleNavigation("/dashboard/admin")}>Dashboard</Button>}

              {/* Botão de logout comum para todos */}
              <Button onClick={handleLogout}>Sair</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => handleNavigation("/cliente/cadastrar-conta")}>Cadastrar</Button>
              <Button onClick={() => handleNavigation("/login/cliente")}>Entrar</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
