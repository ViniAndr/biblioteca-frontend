// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// hooks
import { useClients } from "../../hooks/client/useClients";
import { useClientActions } from "../../hooks/client/useClientActions";

// Icones
import { LuPlus } from "react-icons/lu";

const Clients = () => {
  const { data, loading, search, setSearch, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useClients();

  const { create } = useClientActions();
  const { openModal } = useModal();

  const handleCreate = () => {
    openModal("RegisterOrEditClientModal", {
      // <-- Nome do seu modal de cliente
      title: "Adicionar Novo Cliente",
      size: "xl",
      props: {
        onConfirm: async (formData) => {
          const result = await create(formData);
          // Se deu sucesso no cadastro, atualiza a tabela!
          if (result.success) refetch();
        },
      },
    });
  };

  const headerColumn = ["#", "Nome", "telefone", "cidade", "estado", ""];

  // Temporario
  const handleEdit = (client) => {
    console.log("Editar cliente:", client);
  };

  const handleView = (client) => {
    console.log("Ver cliente:", client);
  };

  const tableActions = {
    onView: handleView,
    onEdit: handleEdit,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search value={search} onChange={setSearch} placeholder="Pesquisar clientes..." />

        <div>
          <Button onClick={handleCreate} className="flex gap-2 items-center h-full">
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
