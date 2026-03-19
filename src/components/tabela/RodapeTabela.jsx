import Paginacao from "../common/Paginacao";
import SeletorItensPorPagina from "../common/SeletorItensPorPagina";

const RodapeTabela = ({ pagina, setPagina, totalPaginas, itensPorPagina, setItensPorPagina }) => {
  return (
    <div className="flex justify-between py-2 px-6 border-t border-zinc-300 bg-gray-100 ">
      <SeletorItensPorPagina itensPorPagina={itensPorPagina} setItensPorPagina={setItensPorPagina} />
      <Paginacao pagina={pagina} setPagina={setPagina} total={totalPaginas} />
    </div>
  );
};

export default RodapeTabela;
