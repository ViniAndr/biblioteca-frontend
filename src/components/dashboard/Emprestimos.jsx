// Componentes
import Tabela from "../tabela/Tabela";
import Pesquisa from "../common/Pesquisa";
import Botao from "../common/Botao";
import Select from "../forms/Select";
import CardsResumo from "./CardsResumo";
import Carregamento from "../common/Carregamento";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useEmprestimos } from "../../hooks/emprestimo/useEmprestimos";
import { useAcoesEmprestimo } from "../../hooks/emprestimo/useAcoesEmprestimo";

// Icones
import { LuPlus } from "react-icons/lu";

const Emprestimos = () => {
  const {
    dados,
    total,
    status,
    carregando,
    pesquisa,
    setPesquisa,
    filtro,
    definirCampoFiltro,
    pagina,
    setPagina,
    itensPorPagina,
    setItensPorPagina,
    totalPaginas,
    recarregar,
  } = useEmprestimos();

  // Hook para modais
  const { abrirModal } = useModal();
  const { criar } = useAcoesEmprestimo();

  const colunasCabecalho = ["#", "Livro", "Cliente", "Data Solicitação", "Prazo", "Status", ""];

  const lidarComVisualizacaoDetalhes = (emprestimo) => {
    abrirModal("detalhesEmprestimo", {
      tamanho: "xl",
      props: { id: emprestimo.id, aoAtualizar: recarregar },
    });
  };

  const lidarComCriacao = () => {
    abrirModal("criarEmprestimo", {
      titulo: "Realizar Novo Empréstimo",
      tamanho: "md",
      props: {
        aoConfirmar: async (dadosFormulario) => {
          const resultado = await criar(dadosFormulario);
          if (resultado.success) recarregar(); // Atualiza a tabela!
        },
      },
    });
  };

  // Configura ações para a tabela
  const acoesTabela = {
    aoVisualizar: lidarComVisualizacaoDetalhes,
  };
  return (
    <div>
      <CardsResumo dadosTabela={dados} />

      <div className="flex gap-4 mb-6">
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar empréstimos..." />

        {/* Selects de Filtros */}
        <div className="flex gap-4">
          <Select
            name="status"
            options={status}
            textoPadraoOpcao="Todos os Status"
            value={filtro.status}
            chaveFiltro="status"
            onChange={definirCampoFiltro}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* O BADGE DO TOTAL (Aparece só se não estiver carregando) */}
          {!carregando && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
              Total: {total} {total === 1 ? "Emprestimo" : "Emprestimos"}
            </div>
          )}

          <Botao onClick={lidarComCriacao} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Botao>
        </div>
      </div>

      {carregando ? (
        <Carregamento texto="Buscando emprestimos..." alturaMinima="min-h-[300px]" />
      ) : dados.length === 0 ? (
        <div className="p-5 text-center">Nenhum Empréstimo encontrado</div>
      ) : (
        <Tabela
          dados={dados}
          colunasCabecalho={colunasCabecalho}
          pagina={pagina}
          setPagina={setPagina}
          totalPaginas={totalPaginas}
          itensPorPagina={itensPorPagina}
          setItensPorPagina={setItensPorPagina}
          acoes={acoesTabela}
        />
      )}
    </div>
  );
};

export default Emprestimos;
