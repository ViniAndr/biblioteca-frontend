import { LuCalendar, LuFileText, LuUser } from "react-icons/lu";

const CardPrefeito = ({ item, isAtual }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all">
      {/* Meta dados superior do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            {item.foto ? <img className="rounded-md" src={item.foto} alt="" /> : <LuUser className="w-15 h-15" />}
          </div>
          <div>
            <h3 className="font-bold text-lg text-zinc-800 leading-snug">{item.nome}</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{item.cargo}</p>
          </div>
        </div>

        {/* Badge de Período */}
        <span
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border w-fit ${
            isAtual
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
              : "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
          }`}
        >
          <LuCalendar className="w-3.5 h-3.5" />
          {item.periodo}
        </span>
      </div>

      {/* Bloco de Texto Histórico (Transição) */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-wide flex items-center gap-2">
          {item.tituloSecao}
        </h4>
        <p className="text-sm text-zinc-600 leading-relaxed text-justify">{item.descricao}</p>
      </div>

      {/* Bloco de Biografia */}
      {(item.tituloBiografia || item.biografia) && (
        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 mb-6 space-y-4">
          <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">Biografia Politica</h4>
          <div>
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">{item.tituloBiografia}</h4>
            <p className="text-sm text-zinc-600 leading-relaxed text-justify">{item.biografia}</p>
          </div>

          {/* aplicado para os dois gestores do ano de 2016 */}
          {item.tituloBiografia2 && (
            <div className="pt-4 border-t border-zinc-200">
              <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
                {item.tituloBiografia2}
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed text-justify">{item.biografia2}</p>
            </div>
          )}
        </div>
      )}

      {/* Seção Discreta de Fontes */}
      <div className="pt-4 border-t border-zinc-100 flex items-start gap-2 text-xs text-zinc-400">
        <LuFileText className="w-4 h-4 mt-0.5 text-zinc-300 shrink-0" />
        <p className="italic leading-snug">
          <span className="font-semibold not-italic text-zinc-500 uppercase tracking-tighter text-[10px] mr-1">
            Fontes validadas:
          </span>
          {item.fontes}
        </p>
      </div>
    </div>
  );
};

export default CardPrefeito;
