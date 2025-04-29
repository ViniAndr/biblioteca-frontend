// Componentes
import Table from "../table/Table";
import Search from "../common/Search";
import Button from "../common/Button";

// Contexts
import { useModal } from "../../contexts/ModalContext";

// Hooks
import { useBookAttributes } from "../../hooks/books/attributes/useBookAttributes";
import { useBookAttributeActions } from "../../hooks/books/attributes/useBookAttributesActions";

// Icones
import { LuPlus } from "react-icons/lu";

const Publishers = () => {
  const { data, loading, filter, setFilter, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useBookAttributes("publisher");

  // Hooks para ações
  const {
    actions: { delete: deleteAction },
  } = useBookAttributeActions("publisher");

  // Hook para modais
  const { openModal } = useModal();

  const headerColumn = ["#", "Editora", "Livros com essa editora", ""];

  const handleDelete = (publisher) => {
    openModal("confirm", {
      title: "Confirmar Exclusão",
      props: {
        message: `Tem certeza que deseja excluir "${publisher.nome}"?`,
        warning: "Esta ação não pode ser desfeita.",
        onConfirm: async () => {
          const result = await deleteAction(publisher.id);
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
        <Search value={filter} handleSearch={setFilter} placeholder="Pesquisar editoras..." />

        <div>
          <Button className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum editora encontrado</div>
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

export default Publishers;
