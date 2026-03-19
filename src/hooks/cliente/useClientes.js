// Hooks
import { useBuscaPaginada } from "../useBuscaPaginada"; // Atualizado

// Servicos
import { listarTodosClientes } from "../../services/clienteService"; // Atualizado

export const useClientes = () => {
  const { dados, ...resto } = useBuscaPaginada({
    servicoBusca: listarTodosClientes,
  });

  return {
    dados: dados?.clientes || [], // Adicionei o '?.' por segurança caso 'dados' venha vazio inicialmente
    total: dados?.total || 0,
    ...resto,
  };
};
