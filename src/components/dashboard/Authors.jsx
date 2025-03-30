// Componentes
import Table from "../table/Table";

// Hooks
import { BookAttributes } from "../../hooks/useBookAttributes";

const Authors = () => {
  const { bookData, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } = BookAttributes("author");

  const headerColumn = ["#", "Autor", "Livros com esse autor", ""];

  return (
    <div>
      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : bookData.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
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
