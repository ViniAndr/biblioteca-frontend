import { LuBookOpen, LuCalendarDays, LuHistory } from "react-icons/lu";
import BadgeStatus from "../../../components/tabela/BadgeStatus";

const STATUS_ATIVOS = ["SOLICITADO", "EMPRESTADO", "ATRASADO"];

const MeusEmprestimos = ({ dados = [] }) => {
  // O componente agora recebe 'dados' diretamente do PerfilCliente
  const formatarStatus = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Lógica de separação (sem requisições extras)
  const ativos = dados.filter((e) => e.status && STATUS_ATIVOS.includes(e.status.toUpperCase()));
  const historico = dados.filter((e) => e.status && !STATUS_ATIVOS.includes(e.status.toUpperCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* SEÇÃO 1: LENDO AGORA */}
      <div>
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <LuBookOpen className="w-4 h-4" /> Lendo Atualmente
        </h4>

        {ativos.length === 0 ? (
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-8 text-center text-zinc-500 text-sm">
            Nenhum empréstimo ativo no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ativos.map((emp) => (
              <div
                key={emp.id}
                className="group bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-bold text-zinc-800 group-hover:text-blue-600 transition-colors">
                    {emp.livro?.titulo}
                  </h5>
                  <BadgeStatus status={formatarStatus(emp.status)} />
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                  <LuCalendarDays className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Entrega prevista:</span>
                  <span className="text-zinc-800">{emp.prazoDevolucao || "Aguardando"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEÇÃO 2: HISTÓRICO */}
      {historico.length > 0 && (
        <div className="pt-6 border-t border-zinc-100">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <LuHistory className="w-4 h-4" /> Histórico de Leitura
          </h4>
          <div className="space-y-3">
            {historico.map((emp) => (
              <div
                key={emp.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50/50 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <div>
                  <p className="font-semibold text-zinc-700">{emp.livro?.titulo}</p>
                  <p className="text-[11px] text-zinc-400 mt-1 uppercase font-bold tracking-tight">
                    Empréstimo em {emp.dataSolicitacao}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  {emp.dataDevolucao && emp.dataDevolucao !== "Aguardando" && (
                    <span className="text-xs font-medium text-zinc-500 px-2 py-1 bg-white border border-zinc-200 rounded-md">
                      Devolvido: {emp.dataDevolucao}
                    </span>
                  )}
                  <BadgeStatus status={formatarStatus(emp.status)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusEmprestimos;
