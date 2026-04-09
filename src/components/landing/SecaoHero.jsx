import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Botao from "../common/Botao";

// Icons
import { IoIosSearch } from "react-icons/io";
import { LuBookMarked } from "react-icons/lu";

const SecaoHero = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  // ENVIA O USUÁRIO COM O TERMO DE BUSCA NA URL
  const lidarComBusca = (e) => {
    e.preventDefault();
    if (termoBusca.trim()) {
      navigate(`/livros?busca=${encodeURIComponent(termoBusca)}`);
    } else {
      navigate("/livros");
    }
  };

  // Gêneros Estáticos Coloridos (Apenas para visual)
  const generosEsteticos = [
    { nome: "Ficção Científica", cor: "bg-blue-50 text-blue-700 border-blue-200" },
    { nome: "Romance", cor: "bg-pink-50 text-pink-700 border-pink-200" },
    { nome: "Fantasia", cor: "bg-purple-50 text-purple-700 border-purple-200" },
    { nome: "Mistério", cor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { nome: "Biografia", cor: "bg-amber-50 text-amber-700 border-amber-200" },
  ];

  return (
    <section className="relative flex py-24 md:py-32 lg:py-40 overflow-hidden bg-zinc-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-blue-200/40 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-purple-200/40 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="container m-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-zinc-900">
            Descubra{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Mundos Infinitos
            </span>
            <br className="hidden sm:block" /> na Nossa Biblioteca
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-zinc-600 leading-relaxed">
            Embarque em jornadas inesquecíveis através das páginas dos nossos livros cuidadosamente selecionados para
            expandir sua mente e tocar sua alma.
          </p>
        </div>

        <form
          onSubmit={lidarComBusca}
          className="max-w-2xl mx-auto bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-400"
        >
          <div className="flex items-center py-2 pl-6 pr-2">
            <IoIosSearch className="text-2xl text-zinc-400" />
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="O que você deseja ler hoje?"
              className="mx-3 outline-none w-full bg-transparent text-zinc-700 placeholder:text-zinc-400"
            />
            <Botao type="submit" arredondamento="rounded-full" className="px-6">
              Explorar
            </Botao>
          </div>
        </form>

        {/* Categorias Estáticas (Pílulas Coloridas) */}
        <div className="flex flex-col items-center mt-12">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <LuBookMarked className="text-zinc-400" /> Gêneros em Destaque
          </span>

          <div className="flex flex-wrap justify-center items-center gap-3">
            {generosEsteticos.map((genero, index) => (
              <div
                key={index}
                // Sem cursor-pointer, apenas uma leve animação de flutuação ao passar o mouse
                className={`px-4 py-1.5 rounded-full border text-sm font-semibold shadow-sm transition-all duration-500 hover:-translate-y-1 ${genero.cor}`}
              >
                {genero.nome}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecaoHero;
