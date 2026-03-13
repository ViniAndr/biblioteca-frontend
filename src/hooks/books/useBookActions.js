import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { createBook, findAPI, getBookById, deleteBook, updateBook } from "../../services/bookService";

export const useBookActions = () => {
  const { showAlert } = useAlert();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [error, setError] = useState(null);

  const create = async (dataBook) => {
    try {
      setLoading(true);
      setCurrentAction("created");
      setError(null);

      const result = await createBook(dataBook);
      if (result.error) throw new Error(result.message?.data?.error || result.message);
    } catch (err) {
      const message = err.message || "Erro ao buscar detalhes do livro.";
      setError(message);
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, dataBook) => {
    try {
      setLoading(true);
      setCurrentAction("update");
      setError(null);

      const result = await updateBook(id, dataBook);
      if (result.error) throw new Error(result.message?.error || "Erro ao atualizar");

      showAlert("Livro atualizado com sucesso!", "success");
      return true; // Retorna true para o modal saber que deu certo e pode fechar
    } catch (err) {
      const message = err.message || "Erro ao atualizar os detalhes do livro.";
      setError(message);
      showAlert(message, "error");
      throw err; // Lança o erro para o Modal não fechar se der ruim
    } finally {
      setLoading(false);
    }
  };

  const findGoogleBooks = async (isbn) => {
    try {
      setLoading(true);
      setCurrentAction("findAPI");
      setError(null);

      const response = await findAPI(isbn);
      setData(response.data);
      return response;
    } catch (err) {
      const message = err.message || "Erro ao buscar detalhes do livro.";
      setError(message);
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (id) => {
    try {
      setLoading(true);
      setCurrentAction("view");
      setError(null);

      const result = await getBookById(id);
      if (result.error) throw new Error(result.message?.data?.error || result.message);

      setData(result.data);
      return result;
    } catch (err) {
      const message = err.message || "Erro ao buscar detalhes do livro.";
      setError(message);
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteAction = async (id) => {
    try {
      setLoading(true);
      setCurrentAction("delete");
      setError(null);

      const result = await deleteBook(id);
      if (result.error) throw new Error(result.message?.data?.error || result.message);

      showAlert("Livro deletado com sucesso!", "success");
    } catch (err) {
      const message = err.message || "Erro ao deletar esse livro.";
      setError(message);
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    viewDetails,
    deleteBook: deleteAction,
    findGoogleBooks,
    create,
    update,
    book: data,
    error,
    loading,
    currentAction,
    isLoading: (action) => loading && currentAction === action,
  };
};
