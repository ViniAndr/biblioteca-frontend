// Componentes
import Table from "../table/Table";

// Hooks
import { usePublishers } from "../../hooks/usePublishers";

const Publishers = () => {
  const { publishers, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } = usePublishers();

  const headerColumn = ["#", "Editora", "Livros com essa Editora", ""];

  return (
    <div>
      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : publishers.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
      ) : (
        <Table
          data={publishers}
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

export default Publishers;
