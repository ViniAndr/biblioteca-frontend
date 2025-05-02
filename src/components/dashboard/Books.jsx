// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Select from "../forms/Select";
import Button from "../common/Button";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useBooks } from "../../hooks/books/useBooks";
import { useBookActions } from "../../hooks/books/useBookActions";

// Icones
import { LuPlus } from "react-icons/lu";

const Books = () => {
  const {
    books,
    authors,
    publishers,
    categories,
    search,
    setSearch,
    filter,
    setFilterField,
    loading,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
  } = useBooks();

  // Hooks para ações
  const { deleteBook } = useBookActions();

  // Hook para modais
  const { openModal } = useModal();

  // Cabeçario da tabela
  const headerColumn = ["#", "Titulo", "ISBN", "Autor", "Editora", "Quantidade Disponível", ""];

  // Dados para criação dos selects de filtro
  const attributeFilterSelect = [
    {
      name: "author",
      options: authors,
      defaultOptionLabel: "Todos os Autores",
    },
    {
      name: "publisher",
      options: publishers,
      defaultOptionLabel: "Todas as Editoras",
    },
    {
      name: "category",
      options: categories,
      defaultOptionLabel: "Todas as Categorias",
    },
  ];

  const handleDelete = (book) => {
    openModal("confirm", {
      title: "Confirmar Desativação",
      props: {
        message: `Tem certeza que deseja desativar esse livro: "${book.title}"?`,
        warning: "Talvez essa ação não possa ser desfeita.",
        onConfirm: async () => {
          await deleteBook(book.id);
          refetch();
        },
      },
    });
  };

  const handleViewDetails = (book) => {
    openModal("detailsBook", {
      title: book.title,
      size: "xl",
      props: { id: book.id },
    });
  };

  const tableActions = {
    onView: handleViewDetails,
    onEdit: true,
    onDelete: handleDelete,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search value={search} onChange={setSearch} placeholder="Pesquisar livros..." />

        {/* Selects de Filtros */}
        <div className="flex gap-4">
          {attributeFilterSelect.map((select) => {
            return (
              <Select
                key={select.name}
                {...select}
                value={filter[select.name] ?? ""}
                onChange={setFilterField}
                filterKey={select.name}
              />
            );
          })}
        </div>
        <div>
          <Button className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : books.length === 0 ? (
        <div className="p-5 text-center">Nenhum livro encontrado</div>
      ) : (
        <Table
          data={books}
          headerColumn={headerColumn}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          actions={tableActions}
        />
      )}
    </div>
  );
};

export default Books;
