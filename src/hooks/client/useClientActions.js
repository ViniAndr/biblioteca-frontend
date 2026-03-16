import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { createClient } from "../../services/clientService";

export const useClientActions = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    try {
      setLoading(true);
      const result = await createClient(data);

      if (result.error) throw new Error(result.message);

      showAlert("Cliente cadastrado com sucesso!", "success");
      return { success: true };
    } catch (error) {
      showAlert(error.message || "Erro ao cadastrar cliente.", "error");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};
