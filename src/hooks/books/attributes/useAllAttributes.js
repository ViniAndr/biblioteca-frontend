import { useState, useEffect } from "react";
import { getAllAttributs } from "../../../services/bookService";

export const useAllAttributes = () => {
  const [attributes, setAttributes] = useState({
    authors: [],
    publishers: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      setLoading(true);
      try {
        const res = await getAllAttributs();
        // console.log("TESTE: ", res);
        if (!res.error) {
          setAttributes({
            authors: res.data.autores,
            publishers: res.data.editoras,
            categories: res.data.categorias,
          });
          // console.log("HOOK: ", attributes);
        } else {
          setError(res.message || "Erro ao carregar atributos.");
        }
      } catch (err) {
        setError("Erro inesperado. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  return { ...attributes, loading, error };
};
