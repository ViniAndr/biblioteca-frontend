import { LuClipboardPen, LuTrash2, LuEye } from "react-icons/lu";

import Button from "../common/Button";

const TableBody = ({ data, actions = {} }) => {
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
              {actions.onView && (
                <Button size="square" onClick={() => actions.onView(item)}>
                  <LuEye />
                </Button>
              )}
              {actions.onEdit && (
                <Button size="square" variant="back" onClick={() => actions.onEdit(item)}>
                  <LuClipboardPen />
                </Button>
              )}
              {actions.onDelete && (
                <Button
                  size="square"
                  variant="delete"
                  onClick={() => actions.onDelete(item)}
                  loading={actions.isDeleting?.(item.id)}
                >
                  <LuTrash2 />
                </Button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
