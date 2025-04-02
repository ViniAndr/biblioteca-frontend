// Componentes
import Table from "../table/Table";
import Search from "../common/Search";

// Hooks
import { useBooks } from "../../hooks/useBooks";

const Books = () => {
  const { books, filter, setFilter, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage, totalItens } = useBooks();

  const headerColumn = ["#", "Titulo", "ISBN", "Autor", "Quantidade", "Quantidade Disponível", ""];

  return (
    <div>
      <div className="mb-8">
        <Search filters={filter} handleSearch={(e) => setFilter(e.target.value)} />
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
        />
      )}
    </div>
  );
};

export default Books;
