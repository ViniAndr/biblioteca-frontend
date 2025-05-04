// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";
import Select from "../forms/Select";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useLoans } from "../../hooks/loans/useLoans";

// Icones
import { LuPlus } from "react-icons/lu";

const Loans = () => {
  const {
    data,
    status,
    loading,
    search,
    setSearch,
    filter,
    setFilterField,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    refetch,
  } = useLoans();

  // Hook para modais
  const { openModal } = useModal();

  const headerColumn = ["#", "Livro", "ISBN", "Solicitado em", "Cliente", "Status", ""];

  const handleViewDetails = (loan) => {
    console.log(loan.book);
    openModal("detailsLoan", {
      size: "xl",
      props: { id: loan.id },
    });
  };

  // Configura ações para a tabela
  const tableActions = {
    onView: handleViewDetails,
    onEdit: true,
  };
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search value={search} onChange={setSearch} placeholder="Pesquisar emprestimos..." />

        {/* Selects de Filtros */}
        <div className="flex gap-4">
          <Select
            name="status"
            options={status}
            defaultOptionLabel="Todos os Status"
            value={filter.status}
            filterKey="status"
            onChange={setFilterField}
          />
        </div>

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
