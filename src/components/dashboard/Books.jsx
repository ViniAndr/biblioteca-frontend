// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Select from "../forms/Select";
import Button from "../common/Button";

// Hooks
import { useBooksAdmin } from "../../hooks/books/useBooksAdmin";

// Icones
import { LuPlus } from "react-icons/lu";

const Books = () => {
  const {
    books,
    authors,
    publishers,
    categories,
    filters,
    setFilters,
    loading,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItens,
  } = useBooksAdmin();

  // Cabeçario da tabela
  const headerColumn = ["#", "Titulo", "ISBN", "Autor", "Quantidade", "Quantidade Disponível", ""];

  // Dados para criação dos selects de filtro
  const attributeFilterSelect = [
    { name: "author", options: authors, defaultOptionLabel: "Todos os Autores" },
    { name: "publisher", options: publishers, defaultOptionLabel: "Todas as Editoras" },
    { name: "category", options: categories, defaultOptionLabel: "Todas as Categorias" },
  ];

  const handleFilterChange = (e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search filters={filters} handleSearch={(e) => setFilters((prev) => ({ ...prev, title: e.target.value }))} />

        {/* Selects de Filtros */}
        <div className="flex gap-4">
          {attributeFilterSelect.map((selectSettings) => (
            <Select
              key={selectSettings.name}
              {...selectSettings}
              value={filters[selectSettings.name]}
              onChange={handleFilterChange}
            />
          ))}
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
