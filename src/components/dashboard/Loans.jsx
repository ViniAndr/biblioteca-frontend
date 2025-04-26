// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Hooks
import { useLoans } from "../../hooks/useLoans";

// Icones
import { LuPlus } from "react-icons/lu";

const Loans = () => {
  const { loans, loading, filter, setFilter, page, setPage, totalPages, itemsPerPage, setItemsPerPage } = useLoans();
  const headerColumn = ["#", "Livro", "ISBN", "Solicitado em", "Cliente", "Status", ""];

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search filters={filter} handleSearch={(e) => setFilter(e.target.value)} />

        <div>
          <Button className="flex gap-2 items-center h-full">
            Fazer Emprestimo <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : loans.length === 0 ? (
        <div className="p-5 text-center">Nenhum Emprestimo encontrado</div>
      ) : (
        <Table
          data={loans}
          headerColumn={headerColumn}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          actions={{ view: true, edit: true, delete: false }}
        />
      )}
    </div>
  );
};

export default Loans;
