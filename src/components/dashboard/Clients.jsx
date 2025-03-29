// Componentes
import Table from "../table/Table";

// hooks
import { useClients } from "../../hooks/useClients";

const Clients = () => {
  const { clients, loading, page, setPage, totalPages, itemsPerPage, setItemsPerPage } = useClients();

  const headerColumn = ["", "Nome", "telefone", "cidade", "estado", ""];

  return (
    <div>
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
