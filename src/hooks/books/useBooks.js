import { useState, useEffect, useCallback } from "react";
import { usePaginatedData } from "../usePaginatedData";
import { getAllBooks } from "../../services/bookService";
import { formatBookForDashboard } from "../../utils/formatters";

export const useBooks = () => {
  const [isAttributesLoaded, setIsAttributesLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Estado para os filtros múltiplos
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    category: "",
    publisher: "",
  });

  // Hook base com estado compartilhado
  const { data, loading, page, setPage, itemsPerPage, setItemsPerPage, totalPages, totalItems, error, refetch } =
    usePaginatedData({
      initialFilter: "",
      fetchService: (_, page, itemsPerPage) => getAllBooks(filters, page, itemsPerPage), // Ignora o filter do hook pai e usa nossos filtros locais
    });

  // Coleta de atributos (autores, editoras, categorias)
  const collectAttributes = useCallback((books) => {
    const uniqueAuthors = new Map();
    const uniquePublishers = new Map();
    const uniqueCategories = new Map();

    books?.forEach(({ autor, editora, categoria }) => {
      // Verificando se existe uma chave com o has
      if (!uniqueAuthors.has(autor.id)) {
        // Adicionando valores
        uniqueAuthors.set(autor.id, { id: autor.id, nome: autor.nome });
      }

      // Adiciona editora única
      if (!uniquePublishers.has(editora.id)) {
        uniquePublishers.set(editora.id, { id: editora.id, nome: editora.nome });
      }

      // Adiciona categorias únicas
      categoria?.forEach((cat) => {
        if (!uniqueCategories.has(cat.id)) {
          uniqueCategories.set(cat.id, { id: cat.id, nome: cat.nome });
        }
      });
    });

    setAuthors(Array.from(uniqueAuthors.values()));
    setPublishers(Array.from(uniquePublishers.values()));
    setCategories(Array.from(uniqueCategories.values()));
  }, []);

  // Efeito para formatar dados e coletar atributos
  useEffect(() => {
    if (data?.livros) {
      const formattedData = data.livros.map(formatBookForDashboard);

      if (!isAttributesLoaded && formattedData.length > 0) {
        collectAttributes(data.livros);
        setIsAttributesLoaded(true);
      }
    }
  }, [data, isAttributesLoaded, collectAttributes]);

  // Atualiza um filtro específico e reseta a página
  const handleSetFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  // Evita Buscar ao ficar segurando alguam tecla
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [filters, refetch]);

  return {
    books: data?.livros?.map(formatBookForDashboard) || [],
    authors,
    publishers,
    categories,
    loading,
    filters,
    setFilter: handleSetFilter, // Para atualizar filtros individuais
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    error,
    refetch,
  };
};
