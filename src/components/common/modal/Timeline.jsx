import { LuCircleHelp, LuCircleCheck, LuBookOpen, LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";

// Componente
export default function Timeline(data) {
  const loan = data.items;

  // Função auxiliar
  const isAguardando = (valor) => valor === "Aguardando";

  // Define cor de cada etapa com base no status do empréstimo
  const getStepStyle = (stepKey, loan) => {
    switch (stepKey) {
      case "solicitado":
      case "aprovado":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-600",
        };

      case "retirado":
        return isAguardando(loan.dataEmprestimo)
          ? { bgColor: "bg-gray-100", textColor: "text-gray-500" }
          : { bgColor: "bg-green-100", textColor: "text-green-600" };

      case "renovadoOuAtrasado":
        if (loan.status === "Atrasado") {
          return { bgColor: "bg-red-100", textColor: "text-red-600" };
        } else if (loan.renovacoes > 0) {
          return { bgColor: "bg-blue-100", textColor: "text-blue-600" };
        } else {
          return { bgColor: "bg-gray-100", textColor: "text-gray-500" };
        }

      case "devolvido":
        return isAguardando(loan.dataDevolucao)
          ? { bgColor: "bg-gray-100", textColor: "text-gray-500" }
          : { bgColor: "bg-green-100", textColor: "text-green-600" };

      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-500" };
    }
  };

  // Lista de etapas
  const steps = [
    {
      key: "solicitado",
      title: "Solicitado",
      date: loan.dataSolicitacao,
      icon: <LuCircleHelp className="w-5 h-5" />,
    },
    {
      key: "aprovado",
      title: "Aprovado",
      date: loan.dataSolicitacao,
      icon: <LuCircleCheck className="w-5 h-5" />,
    },
    {
      key: "retirado",
      title: "Retirado",
      date: loan.dataEmprestimo,
      icon: <LuBookOpen className="w-5 h-5" />,
    },
    {
      key: "renovadoOuAtrasado",
      title: loan.status === "Atrasado" ? "Atrasado" : loan.renovacoes > 0 ? "Renovado" : "Renovação",
      date: loan.status === "Atrasado" ? loan.prazoDevolucao : loan.renovacoes > 0 ? loan.dataRenovacao : "-",
      icon: <LuCircleAlert className="w-5 h-5" />,
    },
    {
      key: "devolvido",
      title: "Devolvido",
      date: loan.dataDevolucao,
      icon: <LuCircleCheckBig className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-between items-center gap-4 p-4 max-w-5xl mx-auto relative">
      {/* Linha de fundo */}
      <div className="absolute top-[36px] left-10 right-10 h-0.5 bg-gray-200 z-0" />
      {steps.map((step, index) => {
        const { bgColor, textColor } = getStepStyle(step.key, loan);
        return (
          <div key={index} className="flex flex-col items-center justify-center text-center relative">
            <div className={`rounded-full p-2 ${bgColor} ${textColor}`}>{step.icon}</div>
            <div className={`mt-2 text-sm font-semibold ${textColor}`}>{step.title}</div>
            <div className={`text-xs ${textColor}`}>{step.date}</div>
          </div>
        );
      })}
    </div>
  );
}
