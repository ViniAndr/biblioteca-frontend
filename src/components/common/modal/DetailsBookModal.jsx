import { useEffect } from "react";

import Bagde from "../Bagde";
import Button from "../Button";
import { useBookActions } from "../../../hooks/books/useBookActions";
import { formatDate } from "../../../utils/formatters";

import { LuUser, LuBuilding, LuCalendar, LuTag, LuBook } from "react-icons/lu";

const DetailsBookModal = ({ id, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { viewDetails, book, loading, error } = useBookActions();
  useEffect(() => {
    if (id) viewDetails(id);
  }, [id]);

  if (loading) {
    return <div>Carregando detalhes do livro...</div>;
  }

  if (!book) return null;
  return (
    <div>
      <div className="flex gap-6 pt-6">
        {/* Coluna 01 */}
        <div className="min-w-48">
          <div className="overflow-hidden aspect-[2/3]">
            <img
              src={`${API_URL}${book.capaPequena}`}
              alt={`Capa do livro ${book.titulo}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div>
              <Bagde size="md" variant="outline">
                ISBN: {book.isbn}
              </Bagde>
            </div>
            <div>
              <Bagde size="md" variant="outline">
                Edição: {book.edicao}
              </Bagde>
            </div>
            <div>
              <Bagde size="md" variant="outline">
                {book.numeroPagina} páginas
              </Bagde>
            </div>
            <div>
              <Bagde size="md" variant="outline">
                Idioma: {book.idioma}
              </Bagde>
            </div>
          </div>
        </div>

        {/* Coluna 02 */}
        <div>
          <h3 className="font-bold text-lg">Descrição</h3>
          <p className="text-[15px] text-zinc-600 mt-2">{book.descricao}</p>

          <hr className="my-5 opacity-20" />

          <div className="flex flex-col gap-2 text-[15px] text-zinc-600 font-light">
            {/* Autor */}
            <div className="flex items-center gap-2 ">
              <LuUser />
              <p>
                <span className="font-medium">Autor:</span> {book.autor.nome}
              </p>
            </div>

            {/* Editora */}
            <div className="flex items-center gap-2 ">
              <LuBuilding />
              <p>
                <span className="font-medium">Editora:</span> {book.editora.nome}
              </p>
            </div>

            {/* Data de Publicação */}
            <div className="flex items-center gap-2 ">
              <LuCalendar />
              <p>
                <span className="font-medium">Publicado em:</span> {formatDate(book.publicadoEm)}
              </p>
            </div>

            {/* Categoria */}
            <div className="flex items-center gap-2 ">
              <LuTag />
              <div>
                <span className="font-medium">Categorias:</span>{" "}
                {book.categoria?.length > 0 ? (
                  book.categoria.map((cat) => (
                    <Bagde key={cat.id} size="md" variant="outline">
                      {cat.nome}
                    </Bagde>
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
                <span className="font-medium">Disponibilidade:</span> {book.qtdDisponivel} de {book.qtdCopias}{" "}
                disponíveis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default DetailsBookModal;
