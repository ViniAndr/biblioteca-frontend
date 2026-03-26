import { useState } from "react";
import { atualizarPerfilFuncionario, obterMeuPerfil } from "../services/funcionarioService";

import { useAlerta } from "../contexts/AlertaContext";

export const useAcoesFuncionario = () => {
  const { mostrarAlerta } = useAlerta();

  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);

  const buscarPerfil = async () => {
    setCarregandoDados(true);
    try {
      const { data, erro } = await obterMeuPerfil();

      if (erro) {
        mostrarAlerta(erro, "error");
        return null;
      }
      return data; // Retorna os dados (nome, email, etc)
    } catch (error) {
      mostrarAlerta("Erro inesperado ao carregar os dados.", "error");
      return null;
    } finally {
      setCarregandoDados(false);
    }
  };

  const atualizarPerfil = async (dados) => {
    setCarregando(true);
    try {
      const { data, erro } = await atualizarPerfilFuncionario(dados);
      if (erro) {
        mostrarAlerta(erro, "error");
        return false;
      }

      mostrarAlerta(data?.mensagem || "Perfil atualizado com sucesso!", "success");
      return true;
    } catch (error) {
      mostrarAlerta("Erro crítico ao tentar salvar as alterações.", "error");
      return false;
    } finally {
      setCarregando(false);
    }
  };

  return {
    buscarPerfil,
    atualizarPerfil,
    carregando,
    carregandoDados,
  };
};
