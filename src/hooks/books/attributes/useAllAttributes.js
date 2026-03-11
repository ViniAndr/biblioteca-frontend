import { useState, useEffect, useCallback } from "react";
import { getAllAttributs } from "../../../services/bookService";

export const useAllAttributes = () => {
  const [attributes, setAttributes] = useState({
    authors: [],
    publishers: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttributes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllAttributs();
      if (!res.error) {
        setAttributes({
          authors: res.data.autores,
          publishers: res.data.editoras,
          categories: res.data.categorias,
        });
      } else {
        setError(res.message || "Erro ao carregar atributos.");
      }
    } catch (err) {
      setError("Erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  return { ...attributes, loading, error, refetch: fetchAttributes };
};
