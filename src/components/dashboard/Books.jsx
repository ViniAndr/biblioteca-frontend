// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Select from "../forms/Select";
import Button from "../common/Button";

// Hooks
import { useBooks } from "../../hooks/books/useBooks";

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
  // Cabeçario da tabela
  const headerColumn = ["#", "Titulo", "ISBN", "Autor", "Editora", "Quantidade Disponível", ""];

  console.log("Component Book: ", search);

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
          actions={{ view: true, edit: true, delete: true }}
        />
      )}
    </div>
  );
};

export default Books;
