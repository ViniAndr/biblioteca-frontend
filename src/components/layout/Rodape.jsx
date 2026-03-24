import { Link } from "react-router-dom";

// Icons
import { FaWhatsapp } from "react-icons/fa";
import { LuMapPin, LuPhone, LuMail, LuInstagram, LuFacebook } from "react-icons/lu";
import { PiBookOpenLight } from "react-icons/pi";

const Rodape = () => {
  return (
    <footer className=" py-12 border-t border-zinc-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:justify-center gap-8 md:gap-16 pb-8">
          {/* Coluna Esquerda */}
          <div>
            {/* logo */}
            <div className="flex items-center gap-2">
              <PiBookOpenLight className="h-6 w-6" />
              <p className="text-xl font-bold tracking-tight">Biblioteca - Telecentro Municipal de Campestre</p>
            </div>
            {/* Breve Descrição */}
            <p className="text-sm text-zinc-600 my-3 md:max-w-96">
              Sua biblioteca digital com milhares de títulos para explorar, aprender e se inspirar.
            </p>
            {/* Rede Social */}
            <div className="flex gap-2">
              <Link to="#">
                <FaWhatsapp className="h-5 w-5 text-zinc-600" />
              </Link>
              <Link to="#">
                <LuInstagram className="h-5 w-5 text-zinc-600" />
              </Link>
              <Link to="#">
                <LuFacebook className="h-5 w-5 text-zinc-600" />
              </Link>
            </div>
          </div>

          {/* Coluna Direita */}
          <div>
            <h3 className="font-medium pb-3">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-1 text-sm text-zinc-600">
                <LuMapPin className="h-4 w-4" />
                <span>Rua minstro Lindoufu Collor, S/N, Campestre - AL</span>
              </li>
              <li className="flex items-center gap-1 text-sm text-zinc-600">
                <LuPhone className="h-4 w-4" />
                <span>(--) ---------</span>
              </li>
              <li className="flex items-center gap-1 text-sm text-zinc-600">
                <LuMail className="h-4 w-4" />
                <span>telecentrocampestre22@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Biblioteca - Telecentro Municipal de Campestre. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
