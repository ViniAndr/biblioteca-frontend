import { useState } from "react";
import { LuChartPie, LuTrendingUp, LuArrowLeft, LuFileText } from "react-icons/lu";

// Importe aqui os relatórios que você for criando
// Exemplo: O relatório que acabamos de fazer!
import RelatorioFormal from "../RelatorioAcervo";

const Relatorios = () => {
  // Estado para controlar qual relatório está aberto na tela.
  // 'null' significa que estamos no menu principal.
  const [relatorioAberto, setRelatorioAberto] = useState(null);

  // --- TELA DO RELATÓRIO ESPECÍFICO ---
  // Se houver um relatório selecionado, renderizamos ele com um botão de "Voltar"
  if (relatorioAberto === "acervo") {
    return (
      <div className="animate-in fade-in duration-300">
        <button
          onClick={() => setRelatorioAberto(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 font-medium mb-4 transition-colors px-2"
        >
          <LuArrowLeft className="w-5 h-5" />
          Voltar para Central de Relatórios
        </button>

        {/* Aqui entra o componente do PDF que fizemos na mensagem anterior */}
        <RelatorioFormal />
      </div>
    );
  }

  // Se quiser colocar o de Inadimplência depois, é só adicionar outro if:
  // if (relatorioAberto === "inadimplencia") return <RelatorioInadimplencia />;

  // --- TELA PRINCIPAL (HUB DE RELATÓRIOS) ---
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Cabeçalho da Central */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800">Central de Relatórios</h1>
        <p className="text-zinc-500 mt-2 max-w-2xl">
          Gere documentos oficiais, estatísticas e listagens para impressão ou envio via PDF. Selecione a categoria
          desejada abaixo.
        </p>
      </div>

      {/* Grid de Opções (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {/* Card 1: Acervo e Patrimônio */}
        <div
          onClick={() => setRelatorioAberto("acervo")}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LuChartPie className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-blue-600 transition-colors">
            Censo do Acervo
          </h2>
          <p className="text-sm text-zinc-500 flex-1">
            Relatório oficial do patrimônio da biblioteca. Inclui total de títulos, exemplares físicos e top autores e
            categorias.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <LuFileText className="w-4 h-4" /> Gerar Documento
          </div>
        </div>

        {/* Card 2: Movimentação (Para fazer depois) */}
        <div
          onClick={() => alert("Relatório de movimentação em construção!")}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LuTrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-emerald-600 transition-colors">
            Impacto Social
          </h2>
          <p className="text-sm text-zinc-500 flex-1">
            Estatísticas de empréstimos, livros mais lidos no mês e engajamento dos leitores com a biblioteca.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <LuFileText className="w-4 h-4" /> Gerar Documento
          </div>
        </div>

        {/* Card 3: Inadimplência (Para fazer depois) */}
        <div
          onClick={() => alert("Relatório de inadimplentes em construção!")}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all cursor-pointer group flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {/* <LuTriangleAlert className="w-6 h-6" /> */}
          </div>
          <h2 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-red-600 transition-colors">
            Risco e Atrasos
          </h2>
          <p className="text-sm text-zinc-500 flex-1">
            Lista de cobrança detalhada com todos os clientes inadimplentes, dias de atraso e contato direto.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <LuFileText className="w-4 h-4" /> Gerar Documento
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
