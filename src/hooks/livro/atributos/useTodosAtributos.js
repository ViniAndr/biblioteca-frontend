import { useState, useEffect, useCallback } from "react";
// Import atualizado com o nome novo da função do serviço
import { listarTodosAtributos } from "../../../services/livroService";

export const useTodosAtributos = () => {
  const [atributos, setAtributos] = useState({
    autores: [],
    editoras: [],
    categorias: [],
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarAtributos = useCallback(async () => {
    setCarregando(true);
    try {
      const res = await listarTodosAtributos();
      if (!res.error) {
        setAtributos({
          autores: res.data.autores,
          editoras: res.data.editoras,
          categorias: res.data.categorias,
        });
      } else {
        setErro(res.message || "Erro ao carregar atributos.");
      }
    } catch (err) {
      setErro("Erro inesperado. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarAtributos();
  }, [buscarAtributos]);

  return { ...atributos, carregando, erro, recarregar: buscarAtributos };
};