// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Hooks
import { useLoans } from "../../hooks/loans/useLoans";

// Icones
import { LuPlus } from "react-icons/lu";

const Loans = () => {
  const { data, loading, filter, setFilter, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useLoans();
  const headerColumn = ["#", "Livro", "ISBN", "Solicitado em", "Cliente", "Status", ""];

  // Configura ações para a tabela
  const tableActions = {
    onView: true,
    onEdit: true,
    onDelete: true,
  };
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search
          value={filter}
          handleSearch={(value) => setFilter("book", value)}
          placeholder="Pesquisar emprestimos..."
        />

        <div>
          <Button className="flex gap-2 items-center h-full">
            Fazer Emprestimo <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum Emprestimo encontrado</div>
      ) : (
        <Table
          data={data}
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

export default Loans;
