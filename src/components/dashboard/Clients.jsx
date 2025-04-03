// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// hooks
import { useClients } from "../../hooks/useClients";

// Icones
import { LuPlus } from "react-icons/lu";

const Clients = () => {
  const { clients, filter, setFilter, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } = useClients();

  const headerColumn = ["#", "Nome", "telefone", "cidade", "estado", ""];

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
      ) : clients.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
      ) : (
        <Table
          data={clients}
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

export default Clients;
