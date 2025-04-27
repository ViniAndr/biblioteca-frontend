// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Hooks
import { useBookAttributes } from "../../hooks/books/attributes/useBookAttributes";
import { useBookAttributeActions } from "../../hooks/books/attributes/useBookAttributesActions";
import { useModal } from "../../contexts/ModalContext";

// Icones
import { LuPlus } from "react-icons/lu";
// import { IoAlertCircleOutline } from "react-icons/io5";

const Authors = () => {
  // Hooks para dados
  const { data, loading, filter, setFilter, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useBookAttributes("author");

  // Hooks para ações
  const {
    actions: { delete: deleteAction },
    actionState,
  } = useBookAttributeActions("author");

  // Hook para modais
  const { openModal } = useModal();

  // Configuração da tabela
  const headerColumn = ["#", "Autor", "Livros com esse autor", ""];

  const handleDelete = (author) => {
    openModal("confirm", {
      title: "Confirmar Exclusão",
      props: {
        message: `Tem certeza que deseja excluir "${author.nome}"?`,
        warning: "Esta ação não pode ser desfeita.",
        onConfirm: async () => {
          const result = await deleteAction(author.id);
          if (result.success) refetch();
        },
      },
    });
  };

  // Configura ações para a tabela
  const tableActions = {
    onEdit: true,
    onDelete: handleDelete,
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Search filters={filter} handleSearch={(e) => setFilter(e.target.value)} />

        <div>
          <Button
            className="flex gap-2 items-center h-full"
            loading={actionState.loading && actionState.currentAction === "create"}
          >
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum autor encontrado</div>
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

export default Authors;
