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

  // Benefícios da leitura
  const beneficios = {
    conhecimento: {
      icone: <LuBrain className="w-10 h-10" />,
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
      icone: <LuRocket className="w-10 h-10" />,
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
      icone: <LuLightbulb className="w-10 h-10" />,
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
      {/* Elementos decorativos - simula livros em várias posições */}
      <div className="absolute w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-40 h-60 border-2  border-primary -rotate-12 top-20 left-[10%] rounded-md"></div>
        <div className="absolute w-40 h-60 border-2  border-primary rotate-45 bottom-20 right-[15%] rounded-md"></div>
        <div className="absolute w-36 h-56 border-2  border-primary rotate-6 top-40 left-[20%] rounded-md"></div>
        <div className="absolute w-32 h-52 border-2  border-primary -rotate-15 bottom-40 right-[25%] rounded-md"></div>
        <div className="absolute w-40 h-60 border-2  border-primary rotate-20 top-1/3 right-[30%] rounded-md"></div>
      </div>

      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">O Poder Transformador da Leitura</h2>

        <p className="text-center text-lg max-w-3xl mx-auto mb-16">
          Descubra como o hábito da leitura pode mudar completamente sua vida, fortalecendo sua mente e ampliando seus
          horizontes.
        </p>

        {/* Tabs de navegação */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Botao
            variante={abaAtiva === "conhecimento" ? "primary" : "outline"}
            onClick={() => setAbaAtiva("conhecimento")}
            className="flex items-center gap-2 hover:scale-105"
          >
            <LuBrain className="w-5 h-5" />
            <span>Conhecimento</span>
          </Botao>

          <Botao
            variante={abaAtiva === "linguagem" ? "primary" : "outline"}
            onClick={() => setAbaAtiva("linguagem")}
            className="flex items-center gap-2 hover:scale-105"
          >
            <LuRocket className="w-5 h-5" />
            <span>Linguagem</span>
          </Botao>

          <Botao
            variante={abaAtiva === "criatividade" ? "primary" : "outline"}
            onClick={() => setAbaAtiva("criatividade")}
            className="flex items-center gap-2 hover:scale-105"
          >
            <LuLightbulb className="w-5 h-5" />
            <span>Criatividade</span>
          </Botao>
        </div>

        {/* Conteúdo dinâmico baseado na tab ativa */}
        <div className="relative">
          {Object.entries(beneficios).map(([chave, detalhesBeneficio]) => (
            <div
              key={chave}
              className={`transition-all duration-500 ${
                abaAtiva === chave
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 absolute inset-0 transform translate-x-8"
              }`}
              style={{ display: abaAtiva === chave ? "block" : "none" }}
            >
              <Beneficio detalhesBeneficio={detalhesBeneficio} />
            </div>
          ))}
        </div>

        {/* Citação inspiradora */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="relative inline-block">
              <span className="absolute -top-8 -left-8 text-9xl font-serif text-primary/10">"</span>
              <blockquote className="italic text-2xl md:text-3xl font-light relative">
                <p>Um leitor vive mil vidas antes de morrer. Aquele que nunca lê vive apenas uma.</p>
              </blockquote>
              <span className="absolute -bottom-20 -right-8 text-9xl font-serif text-primary/10">"</span>
            </div>
            <p className="text-lg font-medium mt-8">George R.R. Martin</p>
            <p className="text-sm text-muted-foreground">Autor de "As Crônicas de Gelo e Fogo"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecaoBeneficios;
