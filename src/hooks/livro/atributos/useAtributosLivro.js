// Hooks (Assumindo que o useBuscaPaginada será traduzido no próximo passo)
import { useBuscaPaginada } from "../../useBuscaPaginada";

// Service
import { obterDadosAtributo } from "../../../services/livroService";

export const useAtributosLivro = (entidade) => {
  // Mapa preparado para aceitar tanto o código antigo em inglês quanto o novo em português
  const MAPA_ENTIDADE = {
    publisher: "editora",
    editora: "editora",
    author: "autor",
    autor: "autor",
    category: "categoria",
    categoria: "categoria",
  };

  const nomeEntidadeApi = MAPA_ENTIDADE[entidade] || entidade;

  const { dados, ...resto } = useBuscaPaginada({
    servicoBusca: (filtros, pagina, itensPorPagina) =>
      obterDadosAtributo(filtros, pagina, itensPorPagina, nomeEntidadeApi),
  });

  // Formatação específica
  const dadosFormatados =
    dados[nomeEntidadeApi]?.map(({ _count, ...rest }) => ({
      ...rest,
      livros: `${_count?.livros || 0} - Livros`,
    })) || [];

  return {
    dados: dadosFormatados,
    total: dados?.total || 0,
    ...resto,
  };
};
