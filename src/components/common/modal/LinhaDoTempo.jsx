import { LuCircleHelp, LuCircleCheck, LuBookOpen, LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";

// Componente
export default function LinhaDoTempo(data) {
  const emprestimo = data.items;

  // Função auxiliar
  const estaAguardando = (valor) => valor === "Aguardando" || !valor;

  // Define cor de cada etapa com base no status do empréstimo
  const obterEstiloEtapa = (chaveEtapa, emprestimo) => {
    switch (chaveEtapa) {
      case "solicitado":
      case "aprovado":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-600",
        };

      case "retirado":
        return estaAguardando(emprestimo.dataEmprestimo)
          ? { bgColor: "bg-gray-100", textColor: "text-gray-500" }
          : { bgColor: "bg-green-100", textColor: "text-green-600" };

      case "renovadoOuAtrasado":
        if (emprestimo.status === "Atrasado") {
          return { bgColor: "bg-red-100", textColor: "text-red-600" };
        } else if (emprestimo.renovacoes > 0) {
          return { bgColor: "bg-blue-100", textColor: "text-blue-600" };
        } else {
          return { bgColor: "bg-gray-100", textColor: "text-gray-500" };
        }

      case "devolvido":
        return estaAguardando(emprestimo.dataDevolucao)
          ? { bgColor: "bg-gray-100", textColor: "text-gray-500" }
          : { bgColor: "bg-green-100", textColor: "text-green-600" };

      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-500" };
    }
  };

  // Lista de etapas
  const etapas = [
    {
      chave: "solicitado",
      titulo: "Solicitado",
      data: emprestimo.dataSolicitacao,
      icone: <LuCircleHelp className="w-5 h-5" />,
    },
    {
      chave: "aprovado",
      titulo: "Aprovado",
      data: emprestimo.dataSolicitacao,
      icone: <LuCircleCheck className="w-5 h-5" />,
    },
    {
      chave: "retirado",
      titulo: "Retirado",
      data: emprestimo.dataEmprestimo,
      icone: <LuBookOpen className="w-5 h-5" />,
    },
    {
      chave: "renovadoOuAtrasado",
      titulo: emprestimo.status === "Atrasado" ? "Atrasado" : emprestimo.renovacoes > 0 ? "Renovado" : "Renovação",
      data: emprestimo.status === "Atrasado" ? emprestimo.prazoDevolucao : emprestimo.renovacoes > 0 ? emprestimo.dataRenovacao : "-",
      icone: <LuCircleAlert className="w-5 h-5" />,
    },
    {
      chave: "devolvido",
      titulo: "Devolvido",
      data: emprestimo.dataDevolucao,
      icone: <LuCircleCheckBig className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-between items-center gap-4 p-4 max-w-5xl mx-auto relative">
      {/* Linha de fundo */}
      <div className="absolute top-[36px] left-10 right-10 h-0.5 bg-gray-200 z-0" />
      {etapas.map((etapa, index) => {
        const { bgColor, textColor } = obterEstiloEtapa(etapa.chave, emprestimo);
        return (
          <div key={index} className="flex flex-col items-center justify-center text-center relative">
            <div className={`rounded-full p-2 ${bgColor} ${textColor}`}>{etapa.icone}</div>
            <div className={`mt-2 text-sm font-semibold ${textColor}`}>{etapa.titulo}</div>
            <div className={`text-xs ${textColor}`}>{etapa.data}</div>
          </div>
        );
      })}
    </div>
  );
}