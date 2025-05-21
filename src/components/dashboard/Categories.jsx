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

const Categories = () => {
  const { data, loading, search, setSearch, page, setPage, itemsPerPage, setItemsPerPage, totalPages, refetch } =
    useBookAttributes("category");

  // Hooks para ações
  const {
    actions: { create, delete: deleteAction },
  } = useBookAttributeActions("category");

  // Hook para modais
  const { openModal } = useModal();

  const headerColumn = ["#", "Categoria", "Livros com essa categoria", ""];

  const handleDelete = (category) => {
    openModal("confirm", {
      title: "Confirmar Exclusão",
      props: {
        message: `Tem certeza que deseja excluir "${category.nome}"?`,
        warning: "Esta ação não pode ser desfeita.",
        onConfirm: async () => {
          const result = await deleteAction(category.id);
          if (result.success) refetch();
        },
      },
    });
  };

  const handleCreate = async () => {
    openModal("createOrEditAttribute", {
      title: "Adicionar Autor",
      props: {
        onConfirm: async (values) => {
          const result = await create(values);
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
        <Search value={search} onChange={setSearch} placeholder="Pesquisar categorias..." />

        <div>
          <Button onClick={handleCreate} className="flex gap-2 items-center h-full">
            Adicionar <LuPlus />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : data.length === 0 ? (
        <div className="p-5 text-center">Nenhum categoria encontrado</div>
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

export default Categories;
