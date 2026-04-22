import ModalConfirmacao from "./ModalConfirmacao";
import ModalDetalhesLivro from "./ModalDetalhesLivro";
import ModalCriarOuEditarAtributo from "./ModalCriarOuEditarAtributo";
import ModalCriarEmprestimo from "./ModalCriarEmprestimo";
import ModalDetalhesEmprestimo from "./ModalDetalhesEmprestimo";
import ModalCriarOuEditarLivro from "./ModalCriarOuEditarLivro";
import ModalCadastrarOuEditarCliente from "./ModalCadastrarOuEditarCliente";
import ModalDetalhesCliente from "./ModalDetalhesCliente";
import ModalEditarPerfilCliente from "./ModalEditarPerfilCliente";

// Registro de tipos de modal e seus componentes correspondentes
const COMPONENTES_MODAL = {
  confirmacao: ModalConfirmacao,
  detalhesLivro: ModalDetalhesLivro,
  detalhesEmprestimo: ModalDetalhesEmprestimo,
  criarOuEditarLivro: ModalCriarOuEditarLivro,
  criarOuEditarAtributo: ModalCriarOuEditarAtributo,
  cadastrarOuEditarCliente: ModalCadastrarOuEditarCliente,
  criarEmprestimo: ModalCriarEmprestimo,
  detalhesCliente: ModalDetalhesCliente,
  editarPerfilCliente: ModalEditarPerfilCliente,
};

const ModalRaiz = ({ estaAberto, tipo, onClose, titulo, props, tamanho, fecharNoOverlay = true }) => {
  if (!estaAberto || !tipo) return null;

  const ComponenteModal = COMPONENTES_MODAL[tipo];

  if (!ComponenteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay - onclick serve para fechar o modal caso click nele */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={fecharNoOverlay ? onClose : undefined} />

      {/* Container do modal */}
      <div className={`relative bg-white rounded-lg shadow-xl p-1 ${obterClassesDeTamanho(tamanho)} overflow-hidden`}>
        {" "}
        {/* Correção: 'overflow-hidde' -> 'overflow-hidden' */}
        <div className={`p-6 overflow-y-auto max-h-[75vh]`}>
          {/* Cabeçalho */}
          {titulo && (
            <div className="pb-3 border-b border-zinc-200">
              <h3 className="text-lg font-bold">{titulo}</h3>
            </div>
          )}

          {/* Corpo do modal renderizado dinamicamente */}
          <div className="text-base">
            <ComponenteModal {...props} aoFechar={onClose} />{" "}
            {/* Enviei a props como 'aoFechar' para padronizar os novos modais */}
          </div>
        </div>
      </div>
    </div>
  );
};

const obterClassesDeTamanho = (tamanhoSolicitado) => {
  const tamanhos = {
    sm: "w-full max-w-sm",
    md: "w-full max-w-md",
    lg: "w-full max-w-lg",
    xl: "w-full max-w-3xl",
  };
  return tamanhos[tamanhoSolicitado] || tamanhos.md;
};

export default ModalRaiz;
