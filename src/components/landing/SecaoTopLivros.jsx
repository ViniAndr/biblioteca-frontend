import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Botao from "../common/Botao";
import CardLivro from "../common/CardLivro";
import Carregamento from "../common/Carregamento";

// Hook
import { useTopLivros } from "../../hooks/livro/useTopLivros";

// Icons
import { GoFlame } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SecaoTopLivros = () => {
  // Puxando os dados e o estado de carregamento do seu hook
  const { dados, carregando } = useTopLivros();

  const navigate = useNavigate();

  // Garantia de que livros será um array válido
  const livros = dados || [];

  const carrosselRef = useRef(null);

  // Função para mover o carrossel horizontalmente
  const rolar = (direcao) => {
    if (carrosselRef.current) {
      // Pula cerca de 80% da tela visível para uma rolagem mais rápida e natural
      const quantidadeRolagem = carrosselRef.current.offsetWidth * 0.8;
      carrosselRef.current.scrollBy({
        left: direcao === "proximo" ? quantidadeRolagem : -quantidadeRolagem,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-zinc-50 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="flex justify-between items-end mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-orange-600">
              <GoFlame className="text-3xl" />
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Os Mais Populares</h2>
            </div>
            <p className="text-zinc-500 text-sm md:text-base ml-1">
              Os 10 livros mais emprestados e cobiçados do momento.
            </p>
          </div>
          <div className="hidden sm:block">
            <Botao variante="outline" onClick={() => navigate("/livros")}>
              Ver Catálogo
            </Botao>
          </div>
        </div>

        {/* Condicionais de Carregamento e Estado Vazio */}
        {carregando ? (
          <Carregamento texto="Calculando o ranking..." alturaMinima="min-h-[350px]" />
        ) : livros.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px] text-zinc-500 border-2 border-dashed border-zinc-200 rounded-xl">
            Nenhum livro no ranking ainda.
          </div>
        ) : (
          <div className="relative group">
            {/* Container do Carrossel com Grupo (para hover dos botões) */}

            {/* Botão Anterior (Esquerda) */}
            <button
              onClick={() => rolar("anterior")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-zinc-50 active:scale-95 transition-all duration-200 p-3 rounded-full shadow-lg border border-zinc-200 text-zinc-600 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
              aria-label="Rolar para a esquerda"
            >
              <IoIosArrowBack className="h-6 w-6" />
            </button>

            {/* Carrossel de livros */}
            <div
              ref={carrosselRef}
              className="flex gap-6 pb-6 pt-2 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {livros.map((livro, index) => (
                // O flex-shrink-0 garante que o card não será esmagado e dita o tamanho fixo!
                <div key={livro.id || index} className="flex-shrink-0 snap-start flex justify-center w-[220px]">
                  <CardLivro
                    titulo={livro.titulo}
                    autor={typeof livro.autor === "object" ? livro.autor?.nome : livro.autor}
                    capa={livro.capaPequena || livro.capa}
                    categoria={livro.categoria}
                    totalEmprestimos={livro.totalEmprestimos || 0}
                    posicao={index + 1}
                  />
                </div>
              ))}
            </div>

            {/* Botão Próximo (Direita) */}
            <button
              onClick={() => rolar("proximo")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-zinc-50 active:scale-95 transition-all duration-200 p-3 rounded-full shadow-lg border border-zinc-200 text-zinc-600 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
              aria-label="Rolar para a direita"
            >
              <IoIosArrowForward className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Botão Mobile (Mostrado apenas em telas pequenas) */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Botao variante="outline" className="w-full">
            Ver Catálogo Completo
          </Botao>
        </div>
      </div>
    </section>
  );
};

export default SecaoTopLivros;
