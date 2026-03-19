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

const Editoras = () => {
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
  } = useAtributosLivro("editora");

  // Hooks para ações
  const {
    acoes: { criar, atualizar, deletar: acaoDeletar },
  } = useAcoesAtributosLivro("editora");

  // Hook para modais
  const { abrirModal } = useModal();

  const colunasCabecalho = ["#", "Editora", "Livros com essa editora", ""];

  const lidarComExclusao = (editora) => {
    abrirModal("confirmacao", {
      titulo: "Confirmar Exclusão",
      props: {
        mensagem: `Tem certeza que deseja excluir "${editora.nome}"?`,
        aviso: "Esta ação não pode ser desfeita.",
        aoConfirmar: async () => {
          const resultado = await acaoDeletar(editora.id);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComCriacao = async () => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Adicionar Editora",
      props: {
        aoConfirmar: async (valores) => {
          const resultado = await criar(valores);
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComEdicao = (editora) => {
    abrirModal("criarOuEditarAtributo", {
      titulo: "Editar Editora",
      props: {
        // Envia o nome atual para o modal abrir com o input preenchido
        dadosIniciais: { nome: editora.nome },

        aoConfirmar: async (valores) => {
          // Aqui chamamos o UPDATE passando o ID da editora e os novos valores
          const resultado = await atualizar(editora.id, valores);
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
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar editoras..." />

        <div className="flex items-center gap-4">
          {/* O BADGE DO TOTAL (Aparece só se não estiver carregando) */}
          {!carregando && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
              Total: {total} {total === 1 ? "Editora" : "Editoras"}
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
        <div className="p-5 text-center">Nenhuma editora encontrada</div>
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

export default Editoras;
