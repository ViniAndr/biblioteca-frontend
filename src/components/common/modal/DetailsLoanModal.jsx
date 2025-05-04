import { useEffect } from "react";
import Bagde from "../Bagde";
import Button from "../Button";
import Timeline from "./Timeline";
import { useLoanActions } from "../../../hooks/loans/useLoanActions";
import {
  LuCircleHelp,
  LuClock,
  LuCircleAlert,
  LuCircleCheckBig,
  LuCircleX,
  LuBookOpen,
  LuUser,
  LuCalendar,
  LuBook,
} from "react-icons/lu";

// Mapeamento de status -> ícones e estilos
const statusHeaderMap = {
  Solicitado: {
    icon: <LuCircleHelp className="w-full h-full text-blue-500" />,
    description: "O cliente solicitou o empréstimo e aguarda retirada",
    bgColor: "bg-blue-50",
    bgIcon: "bg-blue-200",
  },
  Emprestado: {
    icon: <LuClock className="w-full h-full text-purple-500" />,
    description: "O livro foi retirado pelo cliente e está emprestado",
    bgColor: "bg-purple-50",
    bgIcon: "bg-purple-200",
  },
  Atrasado: {
    icon: <LuCircleAlert className="w-full h-full text-red-500" />,
    description: "O prazo de devolução foi ultrapassado",
    bgColor: "bg-red-50",
    bgIcon: "bg-red-200",
  },
  Devolvido: {
    icon: <LuCircleCheckBig className="w-full h-full text-green-500" />,
    description: "O livro foi devolvido à biblioteca",
    bgColor: "bg-green-50",
    bgIcon: "bg-green-200",
  },
  Cancelado: {
    icon: <LuCircleX className="w-full h-full text-gray-500" />,
    description: "O empréstimo foi cancelado",
    bgColor: "bg-gray-50",
    bgIcon: "bg-gray-200",
  },
};

const InfoItem = ({ label, value, className }) => (
  <div className={className}>
    <p className="text-sm text-zinc-600 leading-6">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

const InfoGroup = ({ title, icon: Icon, children }) => (
  <div>
    <div className="flex gap-2 items-center my-5">
      <Icon className="w-5 h-5" />
      <h2 className="font-bold text-xl">{title}</h2>
    </div>
    <div className="border border-zinc-300 rounded-lg p-5">{children}</div>
  </div>
);

const DetailsLoanModal = ({ id, onClose }) => {
  const { viewDetails, data, loading } = useLoanActions();

  useEffect(() => {
    if (id) viewDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) return null;

  const header = statusHeaderMap[data.status] || {};

  return (
    <div>
      {/* Cabeçalho */}
      <div className={`${header.bgColor} p-5 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className={`rounded-full p-2 w-10 h-10 ${header.bgIcon}`}>{header.icon}</div>
            <div>
              <h3 className="text-lg font-bold">{data.status}</h3>
              <p className="text-sm text-zinc-600">{header.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-3 flex justify-between">
          {[
            { label: "Livro", value: data.livro?.titulo, Icon: LuBookOpen },
            { label: "Cliente", value: data.cliente?.nome, Icon: LuUser },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="flex gap-3 items-center">
              <div className="rounded-full p-2 bg-white w-10 h-10">
                <Icon className="w-full h-full" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 leading-6">{label}</p>
                <h3 className="text-base font-bold leading-6">{value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linha do tempo */}
      <div className="my-5">
        <Timeline items={data} />
      </div>

      {/* Detalhes do empréstimo */}
      <InfoGroup title="Detalhes do Empréstimo" icon={LuCalendar}>
        <div className="flex mt-2 gap-10">
          <div className="flex-1 flex flex-col gap-3">
            <InfoItem label="Solicitação e aprovação" value={data.dataSolicitacao} />
            <InfoItem label="Prazo de retirada" value={data.prazoRetirada} />
            <InfoItem label="Data da retirada/empréstimo" value={data.dataEmprestimo} />
            <InfoItem label="Prazo de devolução" value={data.dataDevolucao} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <InfoItem
              label="Data do cancelamento"
              value={data.dataCancelamento === "Aguardando" ? "-" : data.dataCancelamento}
            />
            <InfoItem label="Data da devolução" value={data.dataDevolucao} />
            <InfoItem label="Quantidade de renovações" value={`${data.renovacoes}`} />
            <InfoItem label="Funcionário responsável" value={data.funcionario?.nome || "Aguardando"} />
          </div>
        </div>
      </InfoGroup>

      {/* Informações do Livro */}
      <InfoGroup title="Informações sobre o Livro" icon={LuBook}>
        <div className="flex mt-2 gap-10">
          <div className="flex-1 flex flex-col gap-3">
            <InfoItem label="Título" value={data.livro?.titulo} />
            <InfoItem label="ISBN" value={data.livro?.isbn} />
            <InfoItem label="Autor" value={data.livro?.autor?.nome} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <InfoItem label="Editora" value={data.livro?.editora?.nome} />
            <div>
              <p className="text-sm text-zinc-600 leading-6">Categorias</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {data.livro?.categoria?.map((cat) => (
                  <Bagde key={cat.id} size="md" variant="outline">
                    {cat.nome}
                  </Bagde>
                ))}
              </div>
            </div>
          </div>
        </div>
      </InfoGroup>

      {/* Informações do Cliente */}
      <InfoGroup title="Informações sobre o Cliente" icon={LuUser}>
        <div className="flex-1 flex flex-col gap-3">
          <InfoItem label="Nome" value={data.cliente?.nome} />
          <div className="flex">
            <InfoItem className="flex-1" label="Email" value={data.cliente?.email} />
            <InfoItem className="flex-1" label="Telefone" value={data.cliente?.telefone} />
          </div>
          <InfoItem
            label="Endereço"
            value={`${data.cliente.logradouro}, ${data.cliente.numero} - ${data.cliente.bairro}, ${data.cliente.cidade}/${data.cliente.estado} - ${data.cliente.cep}`}
          />
        </div>
      </InfoGroup>

      {/* Footer */}
      <div className="flex gap-4 justify-end mt-5">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outline">imprimir</Button>
      </div>
    </div>
  );
};

export default DetailsLoanModal;
