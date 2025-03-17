import { Link } from "react-router-dom";

// Components
import Button from "../common/Button";

// Icons
import { PiBookOpenLight } from "react-icons/pi";

export default function Header() {
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
          <Button text="Entrar" to="/login/client" />
        </div>
      </div>
    </header>
  );
}
