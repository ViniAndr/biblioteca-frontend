import { useState } from "react";
import { useAlert } from "../../../contexts/AlertContext";
import { deleteAttribute } from "../../../services/bookService";

const ENTITY_MAP = {
  publisher: "editora",
  author: "autor",
  category: "categoria",
};

export const useBookAttributeActions = (entity) => {
  const { showAlert } = useAlert();
  const [actionState, setActionState] = useState({
    loading: false,
    currentAction: null, // 'create' | 'update' | 'delete'
    error: null,
  });

  const deleteAction = async (id) => {
    try {
      setActionState({ loading: true, currentAction: "delete", error: null });

      const result = await deleteAttribute(ENTITY_MAP[entity], id);

      if (result.error) throw new Error(result.message?.data?.error || result.message);

      showAlert(`${ENTITY_MAP[entity]} deletado com sucesso!`, "success");
      return { success: true };
    } catch (error) {
      showAlert(error.message || `Erro ao deletar ${ENTITY_MAP[entity]}`, "error");
      setActionState((prev) => ({ ...prev, error: error.message }));
      return { success: false, error: error.message };
    } finally {
      setActionState((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    actions: {
      delete: deleteAction,
    },
    actionState, // Expõe todo o estado para feedback granular
    isLoading: (action) => actionState.loading && actionState.currentAction === action,
  };
};
