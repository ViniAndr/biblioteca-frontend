import { useBuscaPaginada } from "../useBuscaPaginada";
import { listarTodosEmprestimos } from "../../services/emprestimoService";

// LISTA ESTÁTICA
const STATUS_OPCOES = [
  { id: "Solicitado", value: "Solicitado", nome: "Solicitado", label: "Solicitado" },
  { id: "Emprestado", value: "Emprestado", nome: "Emprestado", label: "Emprestado" },
  { id: "Atrasado", value: "Atrasado", nome: "Atrasado", label: "Atrasado" },
  { id: "Devolvido", value: "Devolvido", nome: "Devolvido", label: "Devolvido" },
  { id: "Cancelado", value: "Cancelado", nome: "Cancelado", label: "Cancelado" },
];

export const useEmprestimos = () => {
  const { dados, setFiltro, ...resto } = useBuscaPaginada({
    servicoBusca: listarTodosEmprestimos,
  });

  const dadosFormatados =
    dados?.emprestimos?.map((emprestimo) => ({
      id: emprestimo.id,
      livro: emprestimo.livro.titulo,
      cliente: emprestimo.cliente.nome,
      data: emprestimo.dataSolicitacao,
      pazo: emprestimo.prazoDevolucao == "Data inválida" ? "-" : emprestimo.prazoDevolucao,
      status: emprestimo.status,
    })) || [];

  return {
    dados: dadosFormatados,
    total: dados?.total || 0,
    status: STATUS_OPCOES, // Enviando a lista estática pro Select!
    definirCampoFiltro: (chave, valor) => setFiltro({ [chave]: valor }),
    ...resto,
  };
};
