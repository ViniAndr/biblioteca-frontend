import { LuClipboardPen, LuTrash2, LuEye } from "react-icons/lu";

import Button from "../common/Button";

const TableBody = ({ data }) => {
  const handleView = (id) => {
    console.log("Ver: ", id);
  };

  const handleEdit = (id) => {
    console.log("Editar: ", id);
  };

  const handleDelete = (id) => {
    console.log("Apagar: ", id);
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item, index) => {
        // Criando uma cópia do objeto sem o id (para evitar exibição desnecessária)
        const { id, ...itemData } = item;
        return (
          <tr key={id}>
            {/* Numeração da tabela */}
            <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
            {/* Percorre os campos do objeto dinamicamente */}
            {Object.entries(itemData).map(([key, value]) => (
              <td key={`${id}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm">
                {value}
              </td>
            ))}
            {/* Última coluna com os botões de ação */}
            <td className="px-6 flex justify-end gap-2 py-3">
              <Button size="square" onClick={() => handleView(item.id)}>
                <LuEye />
              </Button>
              <Button size="square" variant="back" onClick={() => handleEdit(item.id)}>
                <LuClipboardPen />
              </Button>
              <Button size="square" variant="delete" onClick={() => handleDelete(item.id)}>
                <LuTrash2 />
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
