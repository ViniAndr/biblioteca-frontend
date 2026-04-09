import { useNavigate } from "react-router-dom";

// Components
import Botao from "../common/Botao";

// Icones
import { LuSearch, LuBookmark, LuBookOpen } from "react-icons/lu";

const passos = [
  {
    titulo: "1. Encontre seu Livro",
    descricao: "Navegue pelo nosso catálogo online e descubra milhares de títulos disponíveis em nosso acervo.",
    icone: <LuSearch className="h-8 w-8 text-blue-600" />,
    cor: "bg-blue-100",
  },
  {
    titulo: "2. Faça sua Reserva",
    descricao: "Achou o que queria? Com apenas um clique, você reserva o exemplar e nós guardamos para você.",
    icone: <LuBookmark className="h-8 w-8 text-indigo-600" />,
    cor: "bg-indigo-100",
  },
  {
    titulo: "3. Retire e Aproveite",
    descricao: "Passe na nossa biblioteca, retire seu livro sem filas e embarque em uma nova jornada.",
    icone: <LuBookOpen className="h-8 w-8 text-purple-600" />,
    cor: "bg-purple-100",
  },
];

const SecaoComoFunciona = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Brilhos de fundo para não ficar um preto "morto" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Como funciona a nossa Biblioteca?</h2>
          <p className="text-zinc-400 text-lg">
            Descomplicamos o processo para que você gaste menos tempo em filas e mais tempo lendo.
          </p>
        </div>

        {/* Cards de Passos (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {passos.map((passo, index) => (
            <div
              key={index}
              className="bg-zinc-800/50 border border-zinc-700/50 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-zinc-800 transition-colors duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${passo.cor}`}>
                {passo.icone}
              </div>
              <h3 className="text-xl font-bold mb-3">{passo.titulo}</h3>
              <p className="text-zinc-400 leading-relaxed">{passo.descricao}</p>
            </div>
          ))}
        </div>

        {/* O Grande Call To Action final */}
        <div className="text-center">
          <Botao
            onClick={() => navigate("/livros")}
            className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-600/25 transition-all hover:-translate-y-1"
          >
            Acessar o Catálogo Agora
          </Botao>
        </div>
      </div>
    </section>
  );
};

export default SecaoComoFunciona;
