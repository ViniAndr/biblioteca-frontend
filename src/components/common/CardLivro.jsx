// Components
import Badge from "./Badge";
import Botao from "./Botao";

// Icones
import { LuUsers } from "react-icons/lu";

const CardLivro = ({ titulo, capa, autor, categoria, totalEmprestimos, posicao }) => {
  const URL_API = import.meta.env.VITE_API_URL;
  return (
    <div
      className="relative bg-white w-full max-w-54 shadow-md rounded-md overflow-hidden flex flex-col 
      group transition-all duration-300 hover:shadow-lg"
    >
      {/* Badge para mostrar a posição no ranking */}
      <Badge className="absolute top-2 right-2 z-10">{`#${posicao}`}</Badge>

      {/* Container para manter tamanho fixo */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={`${URL_API}${capa}`}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradiente sobre a imagem */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>

      {/* Área de texto */}
      <div className="p-3">
        <h1 className="font-bold text-xl line-clamp-1 leading-tight">{titulo}</h1>
        <p className="text-sm text-zinc-500 line-clamp-1 leading-tight py-1">{autor}</p>
        <Badge variante={"outline"} tamanho="xs">
          {categoria}
        </Badge>
        <div className="flex justify-between pt-1">
          <div className="text-xs flex items-center gap-1 text-zinc-500">
            <LuUsers />
            <span>{totalEmprestimos} empréstimos</span>
          </div>
          <Botao tamanho="xs">Reservar</Botao>
        </div>
      </div>
    </div>
  );
};

export default CardLivro;
