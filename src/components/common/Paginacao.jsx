import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import Botao from "./Botao";

const Paginacao = ({ pagina, setPagina, total }) => {
  const lidarComProximaPagina = () => {
    if (pagina < total) {
      setPagina(pagina + 1);
    }
  };

  const lidarComPaginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <Botao tamanho="square" onClick={lidarComPaginaAnterior} disabled={pagina === 1}>
        <LuChevronLeft />
      </Botao>
      <span className="text-xs font-medium text-gray-500 uppercase">
        Página {pagina} de {total}
      </span>
      <Botao tamanho="square" onClick={lidarComProximaPagina} disabled={pagina === total}>
        <LuChevronRight />
      </Botao>
    </div>
  );
};

export default Paginacao;
