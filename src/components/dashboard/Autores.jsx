// Componentes
import Tabela from "../tabela/Tabela";
import Pesquisa from "../common/Pesquisa";
import Botao from "../common/Botao";
import Carregamento from "../common/Carregamento";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useAtributosLivro } from "../../hooks/livro/atributos/useAtributosLivro";
import { useAcoesAtributosLivro } from "../../hooks/livro/atributos/useAcoesAtributosLivro";

// Icones
import { LuPlus } from "react-icons/lu";

const Autores = () => {
  // Hooks para dados
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
  } = useAtributosLivro("autor");

  // Hooks para ações
  const {
    acoes: { criar, atualizar, deletar: acaoDeletar },
  } = useAcoesAtributosLivro("autor");

  // Hook para modais
  const { abrirModal } = useModal();

  // Configuração da tabela
  const colunasCabecalho = ["#", "Autor", "Livros com esse autor", ""];

  const lidarComExclusao = (autor) => {
    abrirModal("confirmacao", {
      titulo: "Confirmar Exclusão",
      props: {
        mensagem: `Tem certeza que deseja excluir "${autor.nome}"?`,
        aviso: "Esta ação não pode ser desfeita.",
        aoConfirmar: async () => {
          const resultado = await acaoDeletar(autor.id);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComCriacao = async () => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Adicionar Autor",
      props: {
        aoConfirmar: async (valores) => {
          const resultado = await criar(valores);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComEdicao = (autor) => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Editar Autor",
      props: {
        dadosIniciais: { nome: autor.nome },
        aoConfirmar: async (valores) => {
          const resultado = await atualizar(autor.id, valores);
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
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar autores..." />

        <div className="flex items-center gap-4">
          {/* O BADGE DO TOTAL (Aparece só se não estiver carregando) */}
          {!carregando && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
              Total: {total} {total === 1 ? "Autor" : "Autores"}
            </div>
          )}

          <Botao onClick={lidarComCriacao} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Botao>
        </div>
      </div>

      {carregando ? (
        <Carregamento texto="Buscando autores..." alturaMinima="min-h-[300px]" />
      ) : dados.length === 0 ? (
        <div className="p-5 text-center">Nenhum autor encontrado</div>
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

export default Autores;
