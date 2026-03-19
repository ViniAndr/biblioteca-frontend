// Components
import Botao from "../common/Botao";
import Badge from "../common/Badge";

// Icons
import { IoIosSearch } from "react-icons/io";

const SecaoHero = () => {
  return (
    <section className="flex py-20">
      <div className="m-auto px-4">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Descubra Mundos Infinitos na Nossa Biblioteca
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-zinc-500">
            Embarque em jornadas inesquecíveis através das páginas dos nossos livros cuidadosamente selecionados para
            expandir sua mente e tocar sua alma.
          </p>
        </div>

        {/* Barra de Pesquisa de livros */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl">
          <div className="rounded-3xl border-1 border-zinc-500 py-1 pl-3 pr-1 flex items-center">
            <IoIosSearch className="text-2xl" />
            <input type="text" placeholder="O que você deseja ler hoje?" className="mx-2 outline-0 w-full" />
            <Botao arredondamento={"rounded-3xl"}>Explorar</Botao>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variante={"outlineHover"}>Literatura</Badge>
          <Badge variante={"outlineHover"}>Ficção</Badge>
          <Badge variante={"outlineHover"}>Romance</Badge>
          <Badge variante={"outlineHover"}>Poesia</Badge>
          <Badge variante={"outlineHover"}>Poesia</Badge>
        </div>
      </div>
    </section>
  );
};

export default SecaoHero;
