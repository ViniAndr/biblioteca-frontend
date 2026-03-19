import { LuClipboardPen, LuTrash2, LuEye } from "react-icons/lu";

import Botao from "../common/Botao";
import BadgeStatus from "./BadgeStatus";
import BadgeEstoque from "./BadgeEstoque";

const CorpoTabela = ({ dados, acoes = {} }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {dados.map((item, index) => {
        // Criando uma cópia do objeto sem o id (para evitar exibição desnecessária)
        const { id, ...dadosDoItem } = item;
        return (
          <tr key={id}>
            {/* Numeração da tabela - Padding reduzido */}
            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>

            {/* Percorre os campos do objeto dinamicamente */}
            {Object.entries(dadosDoItem).map(([chave, valor]) => (
              <td
                key={`${id}-${chave}`}
                // melhoria na responsividade aqui
                className={`py-3 px-3 md:px-6 text-sm text-gray-700 ${
                  // Se for um campo de texto longo, permitimos que quebre ou corte com "..."
                  chave === "titulo" ||
                  chave === "livro" ||
                  chave === "autor" ||
                  chave === "descricao" ||
                  chave === "nome"
                    ? "max-w-[150px] xl:max-w-[250px] truncate"
                    : // Caso contrário (números, datas, badges), forçamos a ficar na mesma linha
                      "whitespace-nowrap"
                }`}
                // Adiciona o atributo 'title' para mostrar o texto inteiro no hover
                title={typeof valor === "string" || typeof valor === "number" ? String(valor) : ""}
              >
                {chave === "status" ? (
                  <BadgeStatus status={valor} />
                ) : chave === "estoque" ? (
                  <BadgeEstoque valor={valor} />
                ) : (
                  valor // Se não for status nem estoque, imprime o texto normal
                )}
              </td>
            ))}

            {/* Última coluna com os botões de ação - Padding reduzido */}
            <td className="px-3 md:px-6 flex justify-end gap-2 py-3 whitespace-nowrap">
              {acoes.aoVisualizar && (
                <Botao tamanho="square" onClick={() => acoes.aoVisualizar(item)}>
                  <LuEye />
                </Botao>
              )}
              {acoes.aoEditar && (
                <Botao tamanho="square" variante="back" onClick={() => acoes.aoEditar(item)}>
                  <LuClipboardPen />
                </Botao>
              )}
              {acoes.aoDeletar && (
                <Botao
                  tamanho="square"
                  variante="delete"
                  onClick={() => acoes.aoDeletar(item)}
                  loading={acoes.estaDeletando?.(id)}
                >
                  <LuTrash2 />
                </Botao>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CorpoTabela;
