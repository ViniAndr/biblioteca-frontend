// Hooks
import { useBuscaPaginada } from "../../hooks/useBuscaPaginada"; // ATENÇÃO: Atualizado

// Servicos e utilitarios
import { listarLivrosMaisEmprestados } from "../../services/livroService";
import { formatarLivroParaHome } from "../../utils/formatadores";

export const useTopLivros = () => {
  const { dados } = useBuscaPaginada({
    servicoBusca: listarLivrosMaisEmprestados,
  });

  // Formatação específica
  const dadosFormatados =
    dados.map((livro) => {
      return formatarLivroParaHome(livro);
    }) || [];

  return {
    dados: dadosFormatados,
  };
};
