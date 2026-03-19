import { LuBookOpen, LuClock, LuTriangleAlert, LuCircleCheck } from "react-icons/lu";

const Card = ({ titulo, valor, icone: Icone, cor }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{titulo}</p>
      <h3 className="text-2xl font-bold text-gray-800">{valor}</h3>
    </div>
    <div className={`p-3 rounded-full ${cor}`}>
      <Icone className="w-6 h-6" />
    </div>
  </div>
);

const CardsResumo = ({ dadosTabela }) => {
  // Calculando os totais com base no que está na tela (ou vindo da API)
  const totalSolicitados = dadosTabela.filter((e) => e.status === "SOLICITADO").length;
  const totalEmprestados = dadosTabela.filter((e) => e.status === "EMPRESTADO").length;
  const totalAtrasados = dadosTabela.filter((e) => e.status === "ATRASADO").length;
  const totalDevolvidos = dadosTabela.filter((e) => e.status === "DEVOLVIDO").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card titulo="Aguardando Retirada" valor={totalSolicitados} icone={LuClock} cor="bg-blue-100 text-blue-600" />
      <Card titulo="Emprestados " valor={totalEmprestados} icone={LuBookOpen} cor="bg-yellow-100 text-yellow-600" />
      <Card titulo="Em Atraso" valor={totalAtrasados} icone={LuTriangleAlert} cor="bg-red-100 text-red-600" />
      <Card titulo="Devolvidos" valor={totalDevolvidos} icone={LuCircleCheck} cor="bg-green-100 text-green-600" />
    </div>
  );
};

export default CardsResumo;
