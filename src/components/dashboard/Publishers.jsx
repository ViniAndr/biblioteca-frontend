// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Hooks
import { BookAttributes } from "../../hooks/books/useBookAttributes";

// Icones
import { LuPlus } from "react-icons/lu";

const Publishers = () => {
  const { bookData, filter, setFilter, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } =
    BookAttributes("publisher");

  const headerColumn = ["#", "Editora", "Livros com essa editora", ""];

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
      ) : bookData.length === 0 ? (
        <div className="p-5 text-center">Nenhum editora encontrado</div>
      ) : (
        <Table
          data={bookData}
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

export default Publishers;
