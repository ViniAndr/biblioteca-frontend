import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { deleteBook } from "../../services/bookService";

export const useBookActions = () => {
  const { showAlert } = useAlert();
  const [actionState, setActionState] = useState({
    loading: false,
    currentAction: null, // 'create' | 'update' | 'delete'
    error: null,
  });

  const deleteAction = async (id) => {
    try {
      setActionState({ loading: true, currentAction: "delete", error: null });

      const result = await deleteBook(id);

      if (result.error) throw new Error(result.message?.data?.error || result.message);

      showAlert("Livro deletado com sucesso!", "success");
      return { success: true };
    } catch (error) {
      showAlert(error.message || "Erro ao deletar esse livro.", "error");
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
