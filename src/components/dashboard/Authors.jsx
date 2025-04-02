// Componentes
import Table from "../table/Table";
import Search from "../common/Search";

// Hooks
import { BookAttributes } from "../../hooks/useBookAttributes";

const Authors = () => {
  const { bookData, filter, setFilter, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } =
    BookAttributes("author");

  const headerColumn = ["#", "Autor", "Livros com esse autor", ""];

  return (
    <div>
      <div className="mb-6">
        <Search filters={filter} handleSearch={(e) => setFilter(e.target.value)} />
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : bookData.length === 0 ? (
        <div className="p-5 text-center">Nenhum autor encontrado</div>
      ) : (
        <Table
          data={bookData}
          headerColumn={headerColumn}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default Authors;
