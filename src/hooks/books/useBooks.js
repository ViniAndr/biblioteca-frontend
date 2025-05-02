import { useState, useEffect, useCallback } from "react";

// Hooks
import { usePaginatedFetch } from "../usePaginatedFetch";

// Serviços e utilitários
import { getAllBooks } from "../../services/bookService";
import { formatBookForDashboard } from "../../utils/formatters";

export const useBooks = () => {
  const [isAttributesLoaded, setIsAttributesLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Hook padronizado com usePaginatedFetch
  const { data, setFilter, ...rest } = usePaginatedFetch({
    fetchService: getAllBooks,
  });

  const collectAttributes = useCallback((books) => {
    const uniqueAuthors = new Map();
    const uniquePublishers = new Map();
    const uniqueCategories = new Map();

    books?.forEach(({ autor, editora, categoria }) => {
      if (autor && !uniqueAuthors.has(autor.id)) {
        uniqueAuthors.set(autor.id, { id: autor.id, nome: autor.nome });
      }

      if (editora && !uniquePublishers.has(editora.id)) {
        uniquePublishers.set(editora.id, { id: editora.id, nome: editora.nome });
      }

      categoria?.forEach((cat) => {
        if (cat && !uniqueCategories.has(cat.id)) {
          uniqueCategories.set(cat.id, { id: cat.id, nome: cat.nome });
        }
      });
    });

    setAuthors([...uniqueAuthors.values()]);
    setPublishers([...uniquePublishers.values()]);
    setCategories([...uniqueCategories.values()]);
  }, []);

  useEffect(() => {
    if (data?.livros) {
      const formattedData = data.livros.map(formatBookForDashboard);

      if (!isAttributesLoaded && formattedData.length > 0) {
        collectAttributes(data.livros);
        setIsAttributesLoaded(true);
      }
    }
  }, [data, isAttributesLoaded, collectAttributes]);

  return {
    books: data?.livros?.map(formatBookForDashboard) || [],
    authors,
    publishers,
    categories,
    setFilterField: (key, value) => setFilter({ [key]: value }),
    ...rest,
  };
};
