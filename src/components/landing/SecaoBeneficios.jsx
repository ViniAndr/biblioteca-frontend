import { useState } from "react";

// Components
import Beneficio from "./Beneficio";

// Imagens
import conhecimento from "/images/conhecimento.jpg";
import comunicacao from "/images/comunicacao.jpg";
import criatividade from "/images/criatividade.jpg";

import { LuBrain, LuRocket, LuLightbulb, LuQuote } from "react-icons/lu";

const SecaoBeneficios = () => {
  const [abaAtiva, setAbaAtiva] = useState("conhecimento");

  const beneficios = {
    conhecimento: {
      icone: <LuBrain className="w-6 h-6" />,
      titulo: "A Busca pela Sabedoria",
      descricao:
        "A leitura abre portas para novos mundos e conhecimentos, permitindo que você viaje sem sair do lugar. Cada página virada é uma oportunidade de aprender algo novo.",
      fatos: [
        "75% dos leitores frequentes relatam aprendizado contínuo",
        "Aumenta em 20% a capacidade de retenção de informações",
        "Pessoas que leem regularmente têm vocabulário 50% mais amplo",
      ],
      tema: "blue", // Usaremos isso para dar toques sutis de cor
      imagem: conhecimento,
    },
    linguagem: {
      icone: <LuRocket className="w-6 h-6" />,
      titulo: "O Poder da Expressão",
      descricao:
        "Quanto mais você lê, mais desenvolve sua capacidade de expressão e comunicação. O vocabulário se expande naturalmente, e a articulação de ideias se torna mais fluida.",
      fatos: [
        "Leitores habituais cometem 38% menos erros gramaticais",
        "Crianças conhecem 2 milhões de palavras a mais por ano",
        "Melhora em 32% a capacidade de expressão verbal",
      ],
      tema: "emerald",
      imagem: comunicacao,
    },
    criatividade: {
      icone: <LuLightbulb className="w-6 h-6" />,
      titulo: "Imaginação sem Limites",
      descricao:
        "A literatura estimula a imaginação e a criatividade, apresentando novas perspectivas e ideias. Mergulhar em histórias desenvolve a capacidade de pensar fora da caixa.",
      fatos: [
        "Leitores de ficção têm 55% mais pensamento criativo",
        "Estimula conexões neurais responsáveis pela inovação",
        "88% dos escritores afirmam que ler regularmente é essencial",
      ],
      tema: "indigo",
      imagem: criatividade,
    },
  };

  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Cabeçalho mais limpo e direto */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Por que o hábito da leitura é <span className="text-blue-600">transformador?</span>
          </h2>
          <p className="text-lg text-zinc-500">
            Muito além de um passatempo, a literatura molda nossa mente, expande nosso vocabulário e cria conexões
            duradouras com o mundo.
          </p>
        </div>

        {/* Tabs Modernas - Estilo "Pill Switch" (Fundo cinza, ativo branco) */}
        <div className="flex flex-wrap justify-center p-1.5 mb-16 bg-zinc-100 rounded-2xl mx-auto w-fit border border-zinc-200/60 shadow-inner">
          {Object.keys(beneficios).map((chave) => {
            const isActive = abaAtiva === chave;
            const nomesAbas = { conhecimento: "Sabedoria", linguagem: "Expressão", criatividade: "Imaginação" };
            const Icone = beneficios[chave].icone.type; // Pega o tipo do ícone dinamicamente

            return (
              <button
                key={chave}
                onClick={() => setAbaAtiva(chave)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Icone className="w-5 h-5" />
                {nomesAbas[chave]}
              </button>
            );
          })}
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="min-h-[400px]">
          {Object.entries(beneficios).map(([chave, detalhes]) => (
            <div
              key={chave}
              className={`transition-all duration-500 ${
                abaAtiva === chave ? "opacity-100 animate-in fade-in slide-in-from-bottom-4 block" : "hidden"
              }`}
            >
              <Beneficio detalhes={detalhes} />
            </div>
          ))}
        </div>

        {/* Citação */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-200 text-center relative overflow-hidden shadow-sm">
            <LuQuote className="w-32 h-32 text-zinc-100 absolute -top-4 -left-4 -rotate-12 select-none pointer-events-none" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-zinc-700 leading-relaxed mb-6">
              "Um leitor vive mil vidas antes de morrer. Aquele que nunca lê vive apenas uma."
            </blockquote>
            <div className="relative z-10">
              <p className="font-bold text-zinc-900 text-lg">George R. R. Martin</p>
              <p className="text-zinc-500 text-sm">Autor de "As Crônicas de Gelo e Fogo"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecaoBeneficios;
