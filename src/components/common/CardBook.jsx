import { LuUsers } from "react-icons/lu";
import Badge from "../common/Bagde";
import Button from "../common/Button";

function CardBook({ image, title, author, category, loans, position }) {
  return (
    <div
      className="relative bg-white min-w-52 shadow-md rounded-md overflow-hidden flex flex-col 
      group transition-all duration-300 hover:shadow-lg"
    >
      {/* Badge para mostrar a posição no ranking */}
      <Badge className="absolute top-2 right-2 z-10" text={`#${position}`} />

      {/* Container para manter tamanho fixo */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={image}
          alt={title}
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
        <h1 className="font-bold text-xl line-clamp-1 leading-tight">{title}</h1>
        <p className="text-sm text-zinc-500 line-clamp-1 leading-tight py-1">{author}</p>
        <Badge text={category} variant={"outline"} size="xs" />
        <div className="flex justify-between">
          <div className="text-xs flex items-center gap-1 text-zinc-500">
            <LuUsers />
            <span>{loans} empréstimos</span>
          </div>
          <Button text="Reservar" size="sm" />
        </div>
      </div>
    </div>
  );
}

export default CardBook;
