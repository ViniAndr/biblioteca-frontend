import { Link } from "react-router-dom";

// Icons
import { FaWhatsapp } from "react-icons/fa";
import { LuMapPin, LuPhone, LuMail, LuInstagram, LuFacebook } from "react-icons/lu";
import { PiBookOpenLight } from "react-icons/pi";

const Rodape = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-zinc-200 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Usando Grid para dividir o rodapé perfeitamente */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          {/* Coluna 1: Logo e Sobre (Ocupa mais espaço) */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-2 text-zinc-900 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <PiBookOpenLight className="h-6 w-6" />
              </div>
              <p className="text-xl font-bold tracking-tight">Biblioteca Municipal</p>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed mb-6 md:max-w-sm">
              Telecentro Municipal de Campestre. Sua biblioteca digital com milhares de títulos para explorar, aprender
              e se inspirar todos os dias.
            </p>

            {/* Redes Sociais com links reais e hover nas cores das marcas */}
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-100 rounded-full text-zinc-500 hover:text-green-500 hover:bg-green-50 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-100 rounded-full text-zinc-500 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300"
                aria-label="Instagram"
              >
                <LuInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-100 rounded-full text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                aria-label="Facebook"
              >
                <LuFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Úteis (Adicionado para balancear o design) */}
          <div className="md:col-span-3 lg:col-span-4 md:pl-8 lg:pl-16">
            <h3 className="font-semibold text-zinc-900 mb-5">Navegação Rápida</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/livros" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                  Catálogo de Livros
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                  Acessar Minha Conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="font-semibold text-zinc-900 mb-5">Fale Conosco</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-600 group">
                <div className="mt-0.5 p-1.5 bg-zinc-100 rounded-md text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <LuMapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  Rua Ministro Lindolfo Collor, S/N
                  <br />
                  Campestre - AL
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 group">
                <div className="p-1.5 bg-zinc-100 rounded-md text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <LuPhone className="h-4 w-4" />
                </div>
                <span>(--) ---------</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 group">
                <div className="p-1.5 bg-zinc-100 rounded-md text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <LuMail className="h-4 w-4" />
                </div>
                <span>telecentrocampestre22@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Biblioteca Telecentro Campestre. Todos os direitos reservados.</p>
          <p className="text-xs">Desenvolvido com dedicação para a comunidade.</p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
