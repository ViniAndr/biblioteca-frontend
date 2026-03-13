// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Select from "../forms/Select";
import Button from "../common/Button";
import SelectReact from "react-select";

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
    refetch,
  } = useBooks();

  // Hooks para ações
  const { create, deleteBook, update } = useBookActions();

  // Hook para modais
  const { openModal } = useModal();

  // Cabeçario da tabela
  const headerColumn = ["#", "Titulo", "ISBN", "Autor", "Editora", "Quantidade Disponível", ""];

  // Função auxiliar para mapear os arrays do banco para o padrão do react-select
  const formatFilterOptions = (items) => {
    return (
      items?.map((item) => ({
        value: item.id,
        label: item.nome,
      })) || []
    );
  };

  // Dados para criação dos selects de filtro
  const attributeFilterSelect = [
    {
      name: "author",
      options: formatFilterOptions(authors),
      placeholder: "Autores",
    },
    {
      name: "publisher",
      options: formatFilterOptions(publishers),
      placeholder: "Editoras",
    },
    {
      name: "category",
      options: formatFilterOptions(categories),
      placeholder: "Categorias",
    },
  ];

  const handleCreate = () => {
    openModal("createOrEditBook", {
      title: "Adicionar Novo Livro",
      size: "xl",
      props: {
        textButton: "Criar",
        authors,
        publishers,
        categories,
        onConfirm: async (formData) => {
          await create(formData);
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

  const handleEdit = (book) => {
    openModal("createOrEditBook", {
      title: "Editar Livro",
      size: "xl",
      props: {
        id: book.id, // <--- A CHAVE DE TUDO! Isso avisa o modal que é uma edição.
        textButton: "Salvar Alterações",
        authors,
        publishers,
        categories,
        onConfirm: async (formData) => {
          await update(book.id, formData);
          refetch();
        },
      },
    });
  };

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

  const tableActions = {
    onView: handleViewDetails,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search value={search} onChange={setSearch} placeholder="Pesquisar livros..." />

        {/* Selects de Filtros */}
        <div className="flex gap-4 w-full md:w-auto z-10">
          {attributeFilterSelect.map((select) => {
            // Encontra qual é o objeto selecionado atualmente para exibir na tela
            const currentValue = select.options.find((opt) => opt.value === filter[select.name]) || null;

            return (
              <div key={select.name} className="min-w-[200px]">
                <SelectReact
                  options={select.options}
                  value={currentValue}
                  onChange={(selectedOption) => {
                    // Se o usuário clicar no "X" para limpar, o selectedOption vem como null
                    const valueToSet = selectedOption ? selectedOption.value : "";
                    setFilterField(select.name, valueToSet);
                  }}
                  placeholder={select.placeholder}
                  isClearable={true} // <-- A MÁGICA AQUI! Coloca um "X" para remover o filtro
                  isSearchable={true} // Permite digitar para buscar
                  noOptionsMessage={() => "Nenhum resultado encontrado"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "42px", // Para alinhar com a altura do seu botão/input
                    }),
                  }}
                />
              </div>
            );
          })}
        </div>
        <div>
          <Button onClick={handleCreate} className="flex gap-2 items-center h-full">
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
