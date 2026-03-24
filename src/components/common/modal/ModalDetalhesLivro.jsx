import { useEffect } from "react";

import Badge from "../Badge";
import Botao from "../Botao";
import { useAcoesLivro } from "../../../hooks/livro/useAcoesLivro";
import { formatarData } from "../../../utils/formatadores";

import { LuUser, LuBuilding, LuCalendar, LuTag, LuBook, LuMapPin } from "react-icons/lu";

const ModalDetalhesLivro = ({ id, aoFechar }) => {
  const URL_API = import.meta.env.VITE_API_URL;
  const { visualizarDetalhes, livro, carregando } = useAcoesLivro();

  useEffect(() => {
    if (id) visualizarDetalhes(id);
  }, [id]);

  if (carregando) {
    return <div>Carregando detalhes do livro...</div>;
  }

  if (!livro) return null;
  return (
    <div>
      <div className="flex gap-6 pt-6">
        {/* Coluna 01 */}
        <div className="min-w-48">
          <div className="overflow-hidden aspect-[2/3]">
            <img
              src={`${URL_API}${livro.capaPequena}`}
              alt={`Capa do livro ${livro.titulo}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div>
              <Badge tamanho="md" variante="outline">
                ISBN: {livro.isbn}
              </Badge>
            </div>
            <div>
              <Badge tamanho="md" variante="outline">
                Edição: {livro.edicao}
              </Badge>
            </div>
            <div>
              <Badge tamanho="md" variante="outline">
                {livro.numeroPagina} páginas
              </Badge>
            </div>
            <div>
              <Badge tamanho="md" variante="outline">
                Idioma: {livro.idioma}
              </Badge>
            </div>
          </div>
        </div>

        {/* Coluna 02 */}
        <div>
          <h3 className="font-bold text-lg">Descrição</h3>
          <p className="text-[15px] text-zinc-600 mt-2">{livro.descricao}</p>

          <hr className="my-5 opacity-20" />

          <div className="flex flex-col gap-2 text-[15px] text-zinc-600 font-light">
            {/* Autor */}
            <div className="flex items-center gap-2 ">
              <LuUser />
              <p>
                <span className="font-medium">Autor:</span> {livro.autor.nome}
              </p>
            </div>

            {/* Editora */}
            <div className="flex items-center gap-2 ">
              <LuBuilding />
              <p>
                <span className="font-medium">Editora:</span> {livro.editora.nome}
              </p>
            </div>

            {/* Data de Publicação */}
            <div className="flex items-center gap-2 ">
              <LuCalendar />
              <p>
                <span className="font-medium">Publicado em:</span> {formatarData(livro.publicadoEm)}
              </p>
            </div>

            {/* Categoria */}
            <div className="flex items-center gap-2 ">
              <LuTag />
              <div>
                <span className="font-medium">Categorias:</span>{" "}
                {livro.categoria?.length > 0 ? (
                  livro.categoria.map((cat) => (
                    <Badge key={cat.id} tamanho="md" variante="outline">
                      {cat.nome}
                    </Badge>
                  ))
                ) : (
                  <span className="text-zinc-500">Nenhuma</span>
                )}
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="flex items-center gap-2 ">
              <LuBook />
              <p>
                <span className="font-medium">Disponibilidade:</span> {livro.qtdDisponivel} de {livro.qtdCopias}{" "}
                disponíveis
              </p>
            </div>

            {/* Localização Física */}
            <div className="flex items-center gap-2">
              <LuMapPin />
              <p>
                <span className="font-medium">Localização:</span>{" "}
                {livro.estante || livro.prateleira ? (
                  `Estante ${livro.estante || "-"} / Prateleira ${livro.prateleira || "-"}`
                ) : (
                  <span className="text-zinc-500">Não informada</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Botao variante="outline" onClick={aoFechar}>
          Fechar
        </Botao>
      </div>
    </div>
  );
};

export default ModalDetalhesLivro;
