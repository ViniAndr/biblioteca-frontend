import { useTodosAtributos } from "./atributos/useTodosAtributos";
import { useBuscaPaginada } from "../useBuscaPaginada";

// Serviços e utilitários
import { listarTodosLivros } from "../../services/livroService";
import { formatarLivroParaDashboard } from "../../utils/formatadores";

export const useLivros = (formatador = formatarLivroParaDashboard) => {
  // 1. Pega as listas completas (sem depender dos livros na tela)
  const { autores, editoras, categorias, recarregar: recarregarAtributos } = useTodosAtributos();

  // 2. Pega a lista de livros paginada
  const {
    dados,
    setFiltro,
    recarregar: recarregarLivros,
    ...resto
  } = useBuscaPaginada({
    servicoBusca: listarTodosLivros,
  });

  // 3. O nosso "Super Refetch" que atualiza as duas coisas ao mesmo tempo
  const lidarComRecarregamentoTotal = () => {
    if (recarregarLivros) recarregarLivros();
    if (recarregarAtributos) recarregarAtributos();
  };

  // 4. Retorna os dados diretos, limpos e prontos para o Livros.jsx usar
  return {
    livros: dados?.livros?.map(formatador) || [],
    autores: autores || [],
    editoras: editoras || [],
    categorias: categorias || [],
    totalTitulos: dados?.totalTitulos || 0,
    totalExemplares: dados?.totalExemplares || 0,
    definirCampoFiltro: (chave, valor) => setFiltro({ [chave]: valor }),
    recarregar: lidarComRecarregamentoTotal,
    ...resto,
  };
};
