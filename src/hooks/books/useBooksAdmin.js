import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../../contexts/AlertContext";

// Servicos
import { getAllBooks } from "../../services/bookService";
import { formatBookForDashboard } from "../../utils/formatters";

// view serve para dados úteis para home ou dashboard
export const useBooksAdmin = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // const [filters, setFilters] = useState("");
  const [filters, setFilters] = useState({ title: "", author: "", category: "", publisher: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItens, settotalItens] = useState(0);

  const [isAttributesLoaded, setIsAttributesLoaded] = useState(false);

  // Buscar todos os livros
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getAllBooks(filters, page, itemsPerPage);
      // formatar dados e ordenar
      const formattedData = response.data.livros.map((book) => {
        return formatBookForDashboard(book);
      });

      setBooks(formattedData || []);
      setTotalPages(response.data.qtdTotalDePaginas || 1);
      setPage(response.data.paginaAtual || 1);
      settotalItens(response.data.total || 0);

      // Método responsável por setar os atributos sem precisar ir no Banco de dados
      // Só coleta atributos na primeira vez que carregar os livros
      if (!isAttributesLoaded) {
        collectAttributes(response.data.livros);
        setIsAttributesLoaded(true);
      }
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters, page, itemsPerPage]);

  // Método responsável por setar os atributos sem precisar ir no Banco de dados
  const collectAttributes = (books) => {
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
  };

  return {
    books,
    authors,
    publishers,
    categories,
    loading,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItens,
  };
};
