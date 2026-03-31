import { LuClipboardPen, LuTrash2, LuEye } from "react-icons/lu";

import Botao from "../common/Botao";
import BadgeStatus from "./BadgeStatus";
import BadgeEstoque from "./BadgeEstoque";

const CorpoTabela = ({ dados, acoes = {} }) => {
  const colunasParaCortar = ["titulo", "livro", "autor", "editora", "descricao", "nome"];

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {dados.map((item, index) => {
        const { id, ...dadosDoItem } = item;

        return (
          <tr key={id} className="hover:bg-gray-50 transition-colors">
            <td className="px-3 py-3 text-sm text-gray-500 truncate">{index + 1}</td>

            {Object.entries(dadosDoItem).map(([chave, valor]) => {
              const deveCortar = colunasParaCortar.includes(chave.toLowerCase());

              let textoExibicao = valor;
              if (typeof valor === "object" && valor !== null) {
                textoExibicao = valor.nome || valor.titulo || "";
              }

              return (
                <td key={`${id}-${chave}`} className="px-3 py-3 text-sm text-gray-700">
                  {chave === "status" ? (
                    <BadgeStatus status={valor} />
                  ) : chave === "estoque" ? (
                    <BadgeEstoque valor={valor} />
                  ) : (
                    /* Como a tabela é fixed, o truncate aqui vai fatiar o texto sem piedade! */
                    <div className={deveCortar ? "truncate" : "whitespace-nowrap"} title={String(textoExibicao)}>
                      {textoExibicao}
                    </div>
                  )}
                </td>
              );
            })}

            <td className="px-3 py-3">
              <div className="flex items-center justify-end gap-2">
                {acoes.aoVisualizar && (
                  <Botao tamanho="square" onClick={() => acoes.aoVisualizar(item)}>
                    <LuEye size={18} />
                  </Botao>
                )}
                {acoes.aoEditar && (
                  <Botao tamanho="square" variante="back" onClick={() => acoes.aoEditar(item)}>
                    <LuClipboardPen size={18} />
                  </Botao>
                )}
                {acoes.aoDeletar && (
                  <Botao
                    tamanho="square"
                    variante="delete"
                    onClick={() => acoes.aoDeletar(item)}
                    loading={acoes.estaDeletando?.(id)}
                  >
                    <LuTrash2 size={18} />
                  </Botao>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CorpoTabela;
