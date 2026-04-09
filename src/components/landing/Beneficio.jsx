import { LuCircleCheck } from "react-icons/lu";

const Beneficio = ({ detalhes }) => {
  // Mapeamento de cores suaves baseado no tema escolhido
  const coresTema = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
  };

  const corAtual = coresTema[detalhes.tema] || coresTema.blue;

  // Cor do ícone de check na lista
  const corIconeCheck = {
    blue: "text-blue-500",
    emerald: "text-emerald-500",
    indigo: "text-indigo-500",
  }[detalhes.tema];

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Coluna do Texto */}
      <div className="order-2 md:order-1">
        <div className={`inline-flex p-3 rounded-2xl mb-6 border ${corAtual}`}>{detalhes.icone}</div>

        <h3 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">{detalhes.titulo}</h3>

        <p className="text-lg text-zinc-600 mb-8 leading-relaxed">{detalhes.descricao}</p>

        {/* Card de Fatos Interessantes */}
        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">Dados e Impactos</h4>
          <ul className="space-y-4">
            {detalhes.fatos.map((fato, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-700">
                <LuCircleCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${corIconeCheck}`} />
                <span>{fato}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Coluna da Imagem */}
      <div className="order-1 md:order-2 relative">
        {/* Adorno super sutil atrás da imagem para não deixar solto */}
        <div className={`absolute -inset-4 rounded-3xl opacity-40 blur-2xl ${corAtual.split(" ")[1]}`}></div>

        <div className="relative z-10 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-white">
          <img
            src={detalhes.imagem || ""}
            alt={detalhes.titulo}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Beneficio;
