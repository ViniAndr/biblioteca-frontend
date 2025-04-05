import { useRef } from "react";

// Componets
import Button from "../common/Button";
import CardBook from "../common/CardBook";

// hooks
import { useTopBooks } from "../../hooks/books/useTopBooks";

// Icons
import { GoFlame } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TopBooksSection = () => {
  const { books } = useTopBooks();

  const carouselRef = useRef(null);

  // Função para mover o carrossel horizontalmente
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2; // Rola metade do container
      carouselRef.current.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
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
          <Button variant="ghost">Ver Todos</Button>
        </div>

        {/* Botões de navegação */}
        <div className="relative px-8">
          <button
            onClick={() => scroll("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white active:bg-zinc-100 p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center cursor-pointer"
          >
            <IoIosArrowBack className="h-6 w-6 text-zinc-600" />
          </button>

          {/* Carrossel de livros */}
          <div ref={carouselRef} className=" overflow-x-scroll lg:overflow-hidden ">
            <div className="flex gap-6 pb-4">
              {books.map((book, index) => (
                <CardBook key={index} {...book} position={index + 1} />
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white active:bg-zinc-100 p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center cursor-pointer"
          >
            <IoIosArrowForward className="h-6 w-6 text-zinc-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopBooksSection;
