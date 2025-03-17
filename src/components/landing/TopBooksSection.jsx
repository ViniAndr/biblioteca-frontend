import { useEffect, useState, useRef } from "react";

// Componets
import Button from "../common/Button";
import CardBook from "../common/CardBook";

// Icons
import { GoFlame } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Images
import capa from "/images/teste-capa.jpg";
import capa2 from "/images/teste-capa2.jpg";

const books = [
  { image: capa, title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", category: "Fantasia", loans: 12 },
  { image: capa2, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", category: "Fantasia", loans: 10 },
  { image: capa, title: "Percy Jackson", author: "Rick Riordan", category: "Aventura", loans: 8 },
  { image: capa2, title: "O Hobbit", author: "J.R.R. Tolkien", category: "Fantasia", loans: 6 },
  { image: capa2, title: "O Hobbit", author: "J.R.R. Tolkien", category: "Fantasia", loans: 6 },
  { image: capa2, title: "O Hobbit", author: "J.R.R. Tolkien", category: "Fantasia", loans: 6 },
  { image: capa2, title: "O Hobbit", author: "J.R.R. Tolkien", category: "Fantasia", loans: 6 },
  { image: capa, title: "Dom Casmurro", author: "Machado de Assis", category: "Romance", loans: 5 },
  { image: capa, title: "Dom Casmurro", author: "Machado de Assis", category: "Romance", loans: 5 },
  { image: capa, title: "Dom Casmurro", author: "Machado de Assis", category: "Romance", loans: 5 },
];

function TopBooksSection() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const carouselRef = useRef(null);

  // Ajusta quantos itens aparecem por vez conforme a tela
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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
          <Button text="Ver Todos" variant="ghost" />
        </div>

        {/* Botões de navegação */}
        <div className="relative px-8">
          <button
            onClick={() => scroll("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center"
          >
            <IoIosArrowBack className="h-6 w-6 text-zinc-600" />
          </button>

          {/* Carrossel de livros */}
          <div ref={carouselRef} className="scrollbar-hide overflow-x-hidden">
            <div className="flex gap-6 pb-4">
              {books.map((book, index) => (
                <CardBook key={index} {...book} position={index + 1} />
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex border border-zinc-300 items-center"
          >
            <IoIosArrowForward className="h-6 w-6 text-zinc-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopBooksSection;
