import { useState } from "react";
import { useAlerta } from "../../contexts/AlertaContext";
import { criarCliente, atualizarCliente } from "../../services/clienteService";

export const useAcoesCliente = () => {
  const { mostrarAlerta } = useAlerta();
  const [carregando, setCarregando] = useState(false);

  const criar = async (dados) => {
    try {
      setCarregando(true);
      const resultado = await criarCliente(dados);

      if (resultado.error) throw new Error(resultado.message);

      mostrarAlerta("Cliente cadastrado com sucesso!", "success");
      return { success: true };
    } catch (error) {
      mostrarAlerta(error.message || "Erro ao cadastrar cliente.", "error");
      return { success: false, error: error.message };
    } finally {
      setCarregando(false);
    }
  };

  const atualizar = async (id, dados) => {
    try {
      setCarregando(true);
      const resultado = await atualizarCliente(id, dados);

      if (resultado.error) throw new Error(resultado.message);

      mostrarAlerta("Cliente atualizado com sucesso!", "success");
      return { success: true };
    } catch (error) {
      mostrarAlerta(error.message || "Erro ao atualizar cliente.", "error");
      return { success: false, error: error.message };
    } finally {
      setCarregando(false);
    }
  };

  return { criar, atualizar, carregando };
};
