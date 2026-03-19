// Componentes
import Tabela from "../tabela/Tabela";
import Pesquisa from "../common/Pesquisa";
import Botao from "../common/Botao";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useAtributosLivro } from "../../hooks/livro/atributos/useAtributosLivro";
import { useAcoesAtributosLivro } from "../../hooks/livro/atributos/useAcoesAtributosLivro";

// Icones
import { LuPlus } from "react-icons/lu";

const Categorias = () => {
  const {
    dados,
    total,
    carregando,
    pesquisa,
    setPesquisa,
    pagina,
    setPagina,
    itensPorPagina,
    setItensPorPagina,
    totalPaginas,
    recarregar,
  } = useAtributosLivro("categoria");

  // Hooks para ações
  const {
    acoes: { criar, atualizar, deletar: acaoDeletar },
  } = useAcoesAtributosLivro("categoria");

  // Hook para modais
  const { abrirModal } = useModal();

  const colunasCabecalho = ["#", "Categoria", "Livros com essa categoria", ""];

  const lidarComExclusao = (categoria) => {
    abrirModal("confirmacao", {
      titulo: "Confirmar Exclusão",
      props: {
        mensagem: `Tem certeza que deseja excluir "${categoria.nome}"?`,
        aviso: "Esta ação não pode ser desfeita.",
        aoConfirmar: async () => {
          const resultado = await acaoDeletar(categoria.id);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComCriacao = async () => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Adicionar Categoria", // Correção: de "Autor" para "Categoria"
      props: {
        aoConfirmar: async (valores) => {
          const resultado = await criar(valores);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComEdicao = (categoria) => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Editar Categoria", // Correção: de "Autor" para "Categoria"
      props: {
        dadosIniciais: { nome: categoria.nome },
        aoConfirmar: async (valores) => {
          const resultado = await atualizar(categoria.id, valores);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  // Configura ações para a tabela
  const acoesTabela = {
    aoEditar: lidarComEdicao,
    aoDeletar: lidarComExclusao,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar categorias..." />

        <div className="flex items-center gap-4">
          {/* O BADGE DO TOTAL (Aparece só se não estiver carregando) */}
          {!carregando && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
              Total: {total} {total === 1 ? "Categoria" : "Categorias"}
            </div>
          )}

          <Botao onClick={lidarComCriacao} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Botao>
        </div>
      </div>

      {carregando ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : dados.length === 0 ? (
        <div className="p-5 text-center">Nenhuma categoria encontrada</div>
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

export default Categorias;
