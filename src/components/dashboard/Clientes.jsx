// Componentes
import Tabela from "../tabela/Tabela";
import Pesquisa from "../common/Pesquisa";
import Botao from "../common/Botao";
import Carregamento from "../common/Carregamento";

// Contexts
import { useModal } from "../../contexts/ModalContext";
import { useAlerta } from "../../contexts/AlertaContext";

// hooks
import { useClientes } from "../../hooks/cliente/useClientes";
import { useAcoesCliente } from "../../hooks/cliente/useAcoesCliente";

// Icones
import { LuPlus } from "react-icons/lu";

// Serviço
import { obterClientePorId } from "../../services/clienteService";

const Clientes = () => {
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
  } = useClientes();

  const { criar, atualizar } = useAcoesCliente();
  const { abrirModal } = useModal();
  const { mostrarAlerta } = useAlerta();

  const lidarComCriacao = () => {
    abrirModal("cadastrarOuEditarCliente", {
      titulo: "Adicionar Novo Cliente",
      tamanho: "xl",
      props: {
        aoConfirmar: async (dadosFormulario) => {
          const resultado = await criar(dadosFormulario);
          // Se deu sucesso no cadastro, atualiza a tabela!
          if (resultado.success) recarregar();
        },
      },
    });
  };

  const lidarComVisualizacaoDetalhes = async (clienteClicado) => {
    const response = await obterClientePorId(clienteClicado.id);

    if (response.error) {
      mostrarAlerta("Não foi possível carregar os dados deste cliente.", "error");
      return;
    }

    const clienteCompleto = response.data;

    abrirModal("detalhesCliente", {
      titulo: "Perfil do Cliente",
      tamanho: "xl",
      props: {
        cliente: { ...clienteClicado, ...clienteCompleto },
      },
    });
  };

  const colunasCabecalho = ["#", "Nome", "Telefone", "Cidade", "Estado", ""];

  const lidarComEdicao = async (linhaCliente) => {
    // Busca os dados completos (com endereço) lá do backend
    const response = await obterClientePorId(linhaCliente.id);

    if (response.error) {
      mostrarAlerta("Não foi possível carregar os dados deste cliente.", "error");
      return;
    }

    const clienteCompleto = response.data;

    // O banco manda o nome junto ("João da Silva"). vou separar para o formulário!
    const partesNome = clienteCompleto.nome.split(" ");
    const primeiroNome = partesNome[0];
    const sobrenome = partesNome.slice(1).join(" "); // Pega do segundo nome em diante

    // Montar o objeto
    const dadosIniciais = {
      ...clienteCompleto,
      nome: primeiroNome,
      sobrenome: sobrenome,
    };

    // Abre o modal com os dados preenchidos
    abrirModal("cadastrarOuEditarCliente", {
      titulo: "Editar Cliente",
      tamanho: "xl",
      props: {
        dadosIniciais: dadosIniciais,
        aoConfirmar: async (dadosFormulario) => {
          // Chama o UPDATE passando o ID e os novos dados
          const resultado = await atualizar(linhaCliente.id, dadosFormulario);
          if (resultado.success) recarregar(); // Atualiza a tabela se der certo!
        },
      },
    });
  };

  const acoesTabela = {
    aoVisualizar: lidarComVisualizacaoDetalhes,
    aoEditar: lidarComEdicao,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar clientes..." />

        <div className="flex items-center gap-4">
          {/* O BADGE DO TOTAL (Aparece só se não estiver carregando) */}
          {!carregando && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
              Total: {total} {total === 1 ? "cliente" : "clientes"}
            </div>
          )}

          <Botao onClick={lidarComCriacao} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Botao>
        </div>
      </div>

      {carregando ? (
        <Carregamento texto="Buscando clientes..." alturaMinima="min-h-[300px]" />
      ) : dados.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
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

export default Clientes;
