// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// hooks
import { useClients } from "../../hooks/client/useClients";

// Icones
import { LuPlus } from "react-icons/lu";

const Clients = () => {
  const { data, loading, filter, setFilter, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useClients();

  const headerColumn = ["#", "Nome", "telefone", "cidade", "estado", ""];

  const tableActions = {
    onView: true,
    onEdit: true,
    onDelete: true,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search value={filter} handleSearch={setFilter} />

        <div>
          <Button className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
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

export default Clients;
