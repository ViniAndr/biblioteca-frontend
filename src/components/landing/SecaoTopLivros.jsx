import { useRef } from "react";

// Components
import Botao from "../common/Botao";
import CardLivro from "../common/CardLivro";

// ATENÇÃO: Import do hook traduzido!
import { useTopLivros } from "../../hooks/livro/useTopLivros";

// Icons
import { GoFlame } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SecaoTopLivros = () => {
  const { dados } = useTopLivros();

  const carrosselRef = useRef(null);

  // Função para mover o carrossel horizontalmente
  const rolar = (direcao) => {
    if (carrosselRef.current) {
      const quantidadeRolagem = carrosselRef.current.offsetWidth / 2; // Rola metade do container
      carrosselRef.current.scrollBy({
        left: direcao === "proximo" ? quantidadeRolagem : -quantidadeRolagem,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-zinc-50">
      <div className="container px-4 mx-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <GoFlame className="text-3xl" />
            <h2 className="text-3xl font-bold tracking-tight">Os Mais Populares</h2>
          </div>
          <Botao variante="ghost">Ver Todos</Botao>
        </div>

        {/* Botões de navegação */}
        <div className="relative px-8">
          <Botao
            onClick={() => rolar("anterior")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white active:bg-zinc-100 p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center cursor-pointer"
          >
            <IoIosArrowBack className="h-6 w-6 text-zinc-600" />
          </Botao>

          {/* Carrossel de livros */}
          <div ref={carrosselRef} className=" overflow-x-scroll lg:overflow-hidden ">
            <div className="flex gap-6 pb-4">
              {dados.map((livro, index) => (
                <CardLivro key={index} {...livro} position={index + 1} />
              ))}
            </div>
          </div>

          <Botao
            onClick={() => rolar("proximo")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white active:bg-zinc-100 p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center cursor-pointer"
          >
            <IoIosArrowForward className="h-6 w-6 text-zinc-600" />
          </Botao>
        </div>
      </div>
    </section>
  );
};

export default SecaoTopLivros;
