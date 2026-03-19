// Componentes
import Tabela from "../tabela/Tabela";
import Pesquisa from "../common/Pesquisa";
import Botao from "../common/Botao";
import SelectReact from "react-select";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useLivros } from "../../hooks/livro/useLivros";
import { useAcoesLivro } from "../../hooks/livro/useAcoesLivro";

// Icones
import { LuPlus } from "react-icons/lu";

const Livros = () => {
  const {
    livros,
    autores,
    editoras,
    categorias,
    totalTitulos,
    totalExemplares,
    pesquisa,
    setPesquisa,
    filtro,
    definirCampoFiltro,
    carregando,
    pagina,
    setPagina,
    totalPaginas,
    itensPorPagina,
    setItensPorPagina,
    totalItens,
    recarregar,
  } = useLivros();

  // Hooks para ações
  const { criar, deletarLivro, atualizar } = useAcoesLivro();

  // Hook para modais
  const { abrirModal } = useModal();

  // Cabeçario da tabela
  const colunasCabecalho = ["#", "Titulo", "ISBN", "Autor", "Editora", "Quantidade Disponível", ""];

  // Função auxiliar para mapear os arrays do banco para o padrão do react-select
  const formatarOpcoesFiltro = (itens) => {
    return (
      itens?.map((item) => ({
        value: item.id,
        label: item.nome,
      })) || []
    );
  };

  // Dados para criação dos selects de filtro
  const selectsFiltroAtributo = [
    {
      nome: "autor",
      opcoes: formatarOpcoesFiltro(autores),
      placeholder: "Autores",
    },
    {
      nome: "editora",
      opcoes: formatarOpcoesFiltro(editoras),
      placeholder: "Editoras",
    },
    {
      nome: "categoria",
      opcoes: formatarOpcoesFiltro(categorias),
      placeholder: "Categorias",
    },
  ];

  const lidarComCriacao = () => {
    abrirModal("criarOuEditarLivro", {
      titulo: "Adicionar Novo Livro",
      tamanho: "xl",
      props: {
        textoBotao: "Criar",
        autores,
        editoras,
        categorias,
        aoConfirmar: async (dadosFormulario) => {
          await criar(dadosFormulario);
          recarregar();
        },
      },
    });
  };

  const lidarComVisualizacaoDetalhes = (livro) => {
    abrirModal("detalhesLivro", {
      titulo: livro.titulo,
      tamanho: "xl",
      props: { id: livro.id },
    });
  };

  const lidarComEdicao = (livro) => {
    abrirModal("criarOuEditarLivro", {
      titulo: "Editar Livro",
      tamanho: "xl",
      props: {
        id: livro.id,
        textoBotao: "Salvar Alterações",
        autores,
        editoras,
        categorias,
        aoConfirmar: async (dadosFormulario) => {
          await atualizar(livro.id, dadosFormulario);
          recarregar();
        },
      },
    });
  };

  const lidarComExclusao = (livro) => {
    abrirModal("confirmacao", {
      titulo: "Confirmar Desativação",
      props: {
        mensagem: `Tem certeza que deseja desativar esse livro: "${livro.titulo}"?`,
        aviso: "Talvez essa ação não possa ser desfeita.",
        aoConfirmar: async () => {
          await deletarLivro(livro.id);
          recarregar();
        },
      },
    });
  };

  const acoesTabela = {
    aoVisualizar: lidarComVisualizacaoDetalhes,
    aoEditar: lidarComEdicao,
    aoDeletar: lidarComExclusao,
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg border border-zinc-200 shadow-sm">
          <p className="text-xs text-zinc-500">Total de Títulos</p>
          <p className="text-lg font-bold text-blue-600">{totalTitulos}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-zinc-200 shadow-sm">
          <p className="text-xs text-zinc-500">Total de Títulos</p>
          <p className="text-lg font-bold text-blue-600">{totalTitulos}</p>
        </div>
        {/* O outro card de exemplares... */}
      </div>

      <div className="flex gap-4 mb-6">
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar livros..." />

        {/* Selects de Filtros */}
        <div className="flex gap-4 w-full md:w-auto z-10">
          {selectsFiltroAtributo.map((select) => {
            // Encontra qual é o objeto selecionado atualmente para exibir na tela
            const valorAtual = select.opcoes.find((opt) => opt.value === filtro[select.nome]) || null;

            return (
              <div key={select.nome} className="min-w-[200px]">
                <SelectReact
                  options={select.opcoes}
                  value={valorAtual}
                  onChange={(opcaoSelecionada) => {
                    // Se o usuário clicar no "X" para limpar, o opcaoSelecionada vem como null
                    const valorParaDefinir = opcaoSelecionada ? opcaoSelecionada.value : "";
                    definirCampoFiltro(select.nome, valorParaDefinir);
                  }}
                  placeholder={select.placeholder}
                  isClearable={true}
                  isPesquisaable={true}
                  noOptionsMessage={() => "Nenhum resultado encontrado"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "42px",
                    }),
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm border border-blue-100 shadow-sm flex flex-col items-center leading-tight">
          <span className="font-bold">
            {totalTitulos} {totalTitulos === 1 ? "Título" : "Títulos"}
          </span>
          <span className="text-xs text-blue-500 font-medium">
            ({totalExemplares} {totalExemplares === 1 ? "Exemplar Físico" : "Exemplares Físicos"})
          </span>
        </div>

        <div>
          <Botao onClick={lidarComCriacao} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Botao>
        </div>
      </div>

      {carregando ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : livros.length === 0 ? (
        <div className="p-5 text-center">Nenhum livro encontrado</div>
      ) : (
        <Tabela
          dados={livros}
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

export default Livros;
