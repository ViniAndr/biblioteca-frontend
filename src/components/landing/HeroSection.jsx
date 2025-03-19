// Components
import Button from "../common/Button";
import Badge from "../common/Bagde";

// Icons
import { IoIosSearch } from "react-icons/io";

function HeroSection() {
  return (
    <section className="flex py-20">
      <div className="m-auto px-4">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Descubra Mundos Infinitos na Nossa Biblioteca
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-zinc-500">
            Embarque em jornadas inesquecíveis através das páginas dos nossos livros cuidadosamente selecionados para expandir sua
            mente e tocar sua alma.
          </p>
        </div>

        {/* Barra de Pesquisa de livros */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl">
          <div className="rounded-3xl border-1 border-zinc-500 py-1 pl-3 pr-1 flex items-center">
            <IoIosSearch className="text-2xl" />
            <input type="text" placeholder="O que você deseja ler hoje?" className="mx-2 outline-0 w-full" />
            <Button rounded={"rounded-3xl"}>Explorar</Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge text={"Literatura"} variant={"outlineHover"} />
          <Badge text={"Ficção"} variant={"outlineHover"} />
          <Badge text={"Romance"} variant={"outlineHover"} />
          <Badge text={"Poesia"} variant={"outlineHover"} />
          <Badge text={"Biografia"} variant={"outlineHover"} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
