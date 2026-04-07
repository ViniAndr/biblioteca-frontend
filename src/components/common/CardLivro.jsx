// Components
import Badge from "./Badge";
import Botao from "./Botao";

// Icones
import { LuUsers } from "react-icons/lu";

const CardLivro = ({ titulo, capa, autor, categoria = [], totalEmprestimos, posicao }) => {
  const URL_API = import.meta.env.VITE_API_URL;

  let linkImagem = "https://placehold.co/300x450/e4e4e7/52525b?text=Sem+Capa"; // Imagem padrão

  if (capa) {
    if (capa.startsWith("http://") || capa.startsWith("https://")) {
      linkImagem = capa; // Se for da Amazon ou Google, usa direto!
    } else {
      linkImagem = `${URL_API}${capa}`; // Se for do nosso servidor (/uploads/...), junta com a API
    }
  }

  // Prevenção de erro: garante que sempre será um array, mesmo se vier uma string
  const listaCategorias = Array.isArray(categoria) ? categoria : [categoria];

  return (
    <div
      className="relative bg-white w-full max-w-54 shadow-md rounded-md overflow-hidden flex flex-col 
      group transition-all duration-300 hover:shadow-lg"
    >
      {/* Badge para mostrar a posição no ranking (só renderiza se existir posição) */}
      {posicao && <Badge className="absolute top-2 right-2 z-10">{`#${posicao}`}</Badge>}

      {/* Container para manter tamanho fixo */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={linkImagem}
          alt={titulo || "Capa do Livro"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradiente sobre a imagem */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>

      {/* Área de texto */}
      <div className="p-3 flex flex-col gap-1 flex-grow">
        <h1 className="font-bold text-xl line-clamp-1 leading-tight" title={titulo}>
          {titulo}
        </h1>
        <p className="text-sm text-zinc-500 line-clamp-1 leading-tight" title={autor}>
          {autor}
        </p>

        {/* LISTA DE CATEGORIAS: flex-wrap permite que os badges quebrem linha se forem muitos */}
        <div className="flex flex-wrap gap-1 py-1">
          {listaCategorias.map((cat, index) => {
            if (!cat) return null; // Ignora se vier vazio

            const nomeCategoria = typeof cat === "object" ? cat.nome : cat;
            const key = typeof cat === "object" && cat.id ? cat.id : index;

            return (
              <Badge key={key} variante={"outline"} tamanho="xs">
                {nomeCategoria}
              </Badge>
            );
          })}
        </div>

        {/* Área inferior fixada na base do card */}
        <div className="flex justify-between items-center pt-2 mt-auto border-t border-zinc-100">
          <div className="text-xs flex items-center gap-1 text-zinc-500">
            <LuUsers size={14} />
            <span>{totalEmprestimos} empréstimos</span>
          </div>
          <Botao tamanho="xs">Reservar</Botao>
        </div>
      </div>
    </div>
  );
};

export default CardLivro;
