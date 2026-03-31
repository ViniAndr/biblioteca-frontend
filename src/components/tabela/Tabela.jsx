import CorpoTabela from "./CorpoTabela";
import RodapeTabela from "./RodapeTabela";
import CabecalhoTabela from "./CabecalhoTabela";

const Tabela = ({
  dados,
  colunasCabecalho,
  pagina,
  setPagina,
  totalPaginas,
  itensPorPagina,
  setItensPorPagina,
  acoes,
}) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
      <div className="w-full">
        {/* A MÁGICA AQUI: table-fixed força a tabela a nunca passar da largura da tela */}
        <table className="w-full text-left border-collapse table-fixed">
          <CabecalhoTabela colunas={colunasCabecalho} />
          <CorpoTabela dados={dados} acoes={acoes} />
        </table>
      </div>

      <div className="border-t border-zinc-200">
        <RodapeTabela
          pagina={pagina}
          setPagina={setPagina}
          totalPaginas={totalPaginas}
          itensPorPagina={itensPorPagina}
          setItensPorPagina={setItensPorPagina}
        />
      </div>
    </div>
  );
};

export default Tabela;
