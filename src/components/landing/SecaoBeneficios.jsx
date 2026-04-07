import { useState } from "react";

// Components
import Botao from "../common/Botao";
import Beneficio from "./Beneficio";

// Imagens
import conhecimento from "/images/conhecimento.jpg";
import comunicacao from "/images/comunicacao.jpg";
import criatividade from "/images/criatividade.jpg";

// Icones
import { LuBrain, LuRocket, LuLightbulb } from "react-icons/lu";

const SecaoBeneficios = () => {
  const [abaAtiva, setAbaAtiva] = useState("conhecimento");

  const beneficios = {
    conhecimento: {
      icone: <LuBrain className="w-8 h-8 md:w-10 md:h-10" />,
      titulo: "Expansão do Conhecimento",
      descricao:
        "A leitura abre portas para novos mundos e conhecimentos, permitindo que você viaje sem sair do lugar. Cada página virada é uma oportunidade de aprender algo novo.",
      fatos: [
        "75% dos leitores frequentes relatam aprendizado contínuo",
        "A leitura aumenta em 20% a capacidade de retenção de informações",
        "Pessoas que leem regularmente têm vocabulário 50% mais amplo",
      ],
      cor: "from-blue-600 to-indigo-800",
      imagem: conhecimento,
    },
    linguagem: {
      icone: <LuRocket className="w-8 h-8 md:w-10 md:h-10" />,
      titulo: "Aprimoramento da Linguagem",
      descricao:
        "Quanto mais você lê, mais desenvolve sua capacidade de expressão e comunicação. O vocabulário se expande naturalmente, e a articulação de ideias se torna mais fluida.",
      fatos: [
        "Leitores habituais cometem 38% menos erros gramaticais",
        "Crianças que leem 20 minutos por dia conhecem 2 milhões de palavras a mais por ano",
        "A leitura melhora em 32% a capacidade de expressão verbal",
      ],
      cor: "from-purple-600 to-pink-800",
      imagem: comunicacao,
    },
    criatividade: {
      icone: <LuLightbulb className="w-8 h-8 md:w-10 md:h-10" />,
      titulo: "Estímulo à Criatividade",
      descricao:
        "A literatura estimula a imaginação e a criatividade, apresentando novas perspectivas e ideias. Mergulhar em histórias desenvolve a capacidade de pensar fora da caixa.",
      fatos: [
        "Leitores de ficção têm 55% mais capacidade de pensamento criativo",
        "A leitura estimula conexões neurais responsáveis pela inovação",
        "88% dos escritores afirmam que ler regularmente é essencial para sua criatividade",
      ],
      cor: "from-amber-500 to-red-700",
      imagem: criatividade,
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* NOVA DECORAÇÃO: Glows modernos e orgânicos ao invés de bordas duras.
        Ficam sutis no fundo e não atrapalham a leitura.
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-purple-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] rounded-full bg-amber-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">
            O Poder Transformador da Leitura
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            Descubra como o hábito da leitura pode mudar completamente sua vida, fortalecendo sua mente e ampliando seus
            horizontes.
          </p>
        </div>

        {/* Tabs de navegação - Agora com transição suave de cor */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {Object.keys(beneficios).map((chave) => {
            const { icone } = beneficios[chave];
            const isActive = abaAtiva === chave;
            const nomesAbas = {
              conhecimento: "Conhecimento",
              linguagem: "Linguagem",
              criatividade: "Criatividade",
            };

            return (
              <Botao
                key={chave}
                variante={isActive ? "primary" : "outline"}
                onClick={() => setAbaAtiva(chave)}
                // Classes extras para suavizar o clique e manter consistência
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isActive ? "shadow-md scale-105 ring-2 ring-primary/20 ring-offset-2" : "hover:bg-zinc-50"
                }`}
              >
                {/* Clone do ícone injetando classes de tamanho para não quebrar o layout interno */}
                <div className="w-5 h-5 flex items-center justify-center">{icone}</div>
                <span className="font-medium">{nomesAbas[chave]}</span>
              </Botao>
            );
          })}
        </div>

        {/* CONTEÚDO DINÂMICO (CORRIGIDO) */}
        <div className="grid grid-cols-1 grid-rows-1 relative min-h-[400px]">
          {Object.entries(beneficios).map(([chave, detalhesBeneficio]) => (
            <div
              key={chave}
              className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${
                abaAtiva === chave
                  ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                  : "opacity-0 translate-y-8 z-0 pointer-events-none"
              }`}
            >
              <Beneficio detalhesBeneficio={detalhesBeneficio} />
            </div>
          ))}
        </div>

        {/* Citação inspiradora - Adaptada para mobile */}
        <div className="mt-32 max-w-4xl mx-auto px-4 md:px-12">
          <div className="text-center relative">
            {/* Aspas mais elegantes e sem causar scroll lateral no mobile */}
            <span className="absolute -top-12 left-0 md:-left-8 text-8xl md:text-9xl font-serif text-zinc-200/60 select-none">
              "
            </span>

            <blockquote className="italic text-xl md:text-3xl font-light text-zinc-700 relative z-10 leading-relaxed">
              <p>Um leitor vive mil vidas antes de morrer. Aquele que nunca lê vive apenas uma.</p>
            </blockquote>

            <span className="absolute -bottom-16 right-0 md:-right-8 text-8xl md:text-9xl font-serif text-zinc-200/60 select-none">
              "
            </span>

            <div className="mt-10 relative z-10">
              <p className="text-lg font-bold text-zinc-900">George R. R. Martin</p>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mt-1">
                Autor de "As Crônicas de Gelo e Fogo"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecaoBeneficios;
