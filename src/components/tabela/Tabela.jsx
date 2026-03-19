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
    <div className="rounded border border-zinc-200">
      <div className="overflow-x-scroll lg:overflow-x-hidden">
        <table className="w-full">
          <CabecalhoTabela colunas={colunasCabecalho} />
          <CorpoTabela dados={dados} acoes={acoes} />
        </table>
      </div>
      {/* Rodapé */}
      <RodapeTabela
        pagina={pagina}
        setPagina={setPagina}
        totalPaginas={totalPaginas}
        itensPorPagina={itensPorPagina}
        setItensPorPagina={setItensPorPagina}
      />
    </div>
  );
};

export default Tabela;
