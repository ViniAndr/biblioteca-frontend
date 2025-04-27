// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Hooks
import { useBookAttributes } from "../../hooks/books/attributes/useBookAttributes";

// Icones
import { LuPlus } from "react-icons/lu";

const Categories = () => {
  const { data, loading, filter, setFilter, page, setPage, itemsPerPage, setItemsPerPage, totalPages } =
    useBookAttributes("category");

  const headerColumn = ["#", "Categoria", "Livros com essa categoria", ""];

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search filters={filter} handleSearch={(e) => setFilter(e.target.value)} />

        <div>
          <Button className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum categoria encontrado</div>
      ) : (
        <Table
          data={data}
          headerColumn={headerColumn}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          actions={{ view: false, edit: true, delete: true }}
        />
      )}
    </div>
  );
};

export default Categories;
