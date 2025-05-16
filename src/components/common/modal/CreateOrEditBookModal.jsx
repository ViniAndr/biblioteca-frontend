import { useState, useEffect } from "react";
import Input from "../../forms/Input";
import Button from "../Button";
import Select from "../../forms/Select";
import MultiSelect from "./MultiSelect";
import BookCoverUploader from "./BookCoverUploader";
import { useBookActions } from "../../../hooks/books/useBookActions";
import { useAllAttributes } from "../../../hooks/books/attributes/useAllAttributes";
import useForm from "../../../hooks/useForm";
import * as validate from "../../../utils/validations";

//Lista de idiomas suportados pelo sistema com seus respectivos códigos e nomes
const LANGUAGES = [
  { code: "pt-BR", language: "Português (Brasil)" },
  { code: "pt-PT", language: "Português (Portugal)" },
  { code: "en", language: "Inglês" },
  { code: "es", language: "Espanhol" },
  { code: "fr", language: "Francês" },
  { code: "de", language: "Alemão" },
  { code: "it", language: "Italiano" },
  { code: "ja", language: "Japonês" },
];

//Componente modal para criação ou edição de livros
const CreateOrEditBookModal = ({ onClose, id, onConfirm, textButton }) => {
  // Hooks para ações e atributos de livros
  const { findGoogleBooks, loading } = useBookActions();
  const { authors, publishers, categories, loading: loadingAttrs } = useAllAttributes();

  // Estado para controlar se deve buscar dados da API
  const [findAPI, setFindAPI] = useState(false);

  const { values, errors, handleChange, validateAll } = useForm(
    {
      titulo: "",
      isbn: "",
      qtdCopias: 1,
      edicao: 1,
      autorId: 0,
      editoraId: 0,
      categoriaIds: [],
      numeroPagina: 100,
      publicadoEm: new Date().toISOString().split("T")[0],
      idioma: "",
      descricao: "",
      capa: "",
    },
    {
      titulo: validate.validateRequiredField,
      isbn: validate.validateISBN,
      qtdCopias: validate.validatePositiveInteger,
      edicao: validate.validatePositiveInteger,
      numeroPagina: validate.validatePositiveInteger,
      autorId: validate.validateSelectField,
      editoraId: validate.validateSelectField,
      idioma: validate.validateSelectField,
      categoriaIds: validate.validateRequiredField,
      capa: validate.validateRequiredField,
    }
  );

  // Função para criar ou editar os dados
  const handleSubmit = async () => {
    if (!validateAll()) return;
    if (onConfirm) {
      await onConfirm(values);
      onClose();
    }
  };

  // Adicione esta função utilitária no topo do arquivo
  const safeValue = (value, fallback = "") => value ?? fallback;

  // Efeito para buscar dados da API quando o ISBN é fornecido e findAPI é true
  useEffect(() => {
    // Busca dados do livro na API do Google Books com base no ISBN
    const fetchData = async () => {
      if (!values.isbn) return;
      const result = await findGoogleBooks(values.isbn);

      if (!result?.error && result?.data) {
        const updates = {
          titulo: result.data?.titulo,
          edicao: Number(safeValue(result.data?.edicao, 1)),
          autorId: Number(safeValue(result.data?.autor?.id, 0)),
          editoraId: Number(safeValue(result.data?.editora?.id, 0)),
          numeroPagina: Number(safeValue(result.data?.numeroPagina, 100)),
          publicadoEm: safeValue(result.data?.publicadoEm, new Date().toISOString().split("T")[0]),
          idioma: safeValue(result.data?.idioma),
          descricao: safeValue(result.data?.descricao),
          capa: safeValue(result.data?.capa),
        };

        Object.entries(updates).forEach(([key, val]) => {
          handleChange({ target: { name: key, value: val } });
        });
      }
    };

    if (findAPI) {
      fetchData();
      setFindAPI(false); // Resetar o estado após a busca
    }
  }, [findAPI]);

  return (
    <div className="pt-4 flex flex-col gap-4">
      {/* Seção de busca por ISBN */}
      <div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              id="isbn"
              name="isbn"
              label="ISBN"
              placeholder="Digite o ISBN do livro"
              value={values.isbn}
              onChange={handleChange}
              error={errors.isbn}
            />
          </div>
          <Button className="h-10" disabled={loading} onClick={() => setFindAPI(true)}>
            Buscar
          </Button>
        </div>
        <p className="text-sm font-light text-zinc-500 my-4">
          Digite o ISBN e clique em buscar para preencher automaticamente os dados do livro
        </p>
        <hr className="opacity-10" />
      </div>

      {/* Campo: Título do livro */}
      <Input
        id="titulo"
        name="titulo"
        label="Título"
        placeholder="Título do livro"
        value={values.titulo}
        onChange={handleChange}
        error={errors.titulo}
        disabled={loading}
      />

      {/* Grupo de campos numéricos: Quantidade, Edição e Páginas */}
      <div className="flex gap-4">
        {[
          { id: "qtdCopias", label: "Quantidade de cópias" },
          { id: "edicao", label: "Edição" },
          { id: "numeroPagina", label: "Número de Páginas" },
        ].map(({ id, label }) => (
          <div className="flex-1" key={id}>
            <Input
              id={id}
              name={id}
              label={label}
              type="number"
              min="1"
              value={values[id]}
              onChange={handleChange}
              error={errors[id]}
              disabled={loading}
            />
          </div>
        ))}
      </div>

      {/* Grupo de seleção: Autor e Editora */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            id="autorId"
            label="Autor"
            options={authors}
            value={values.autorId}
            onChange={(value) => handleChange({ target: { name: "autorId", value } })}
            placeholder="Selecione um autor"
            error={errors.autorId}
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <Select
            id="editoraId"
            label="Editora"
            options={publishers}
            value={values.editoraId}
            onChange={(value) => handleChange({ target: { name: "editoraId", value } })}
            placeholder="Selecione uma editora"
            error={errors.editoraId}
            disabled={loading}
          />
        </div>
      </div>

      {/* Grupo de seleção: Idioma e Data de Publicação */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            id="idioma"
            label="Idioma"
            options={LANGUAGES}
            value={values.idioma}
            valueKey="code"
            labelKey="language"
            onChange={(value) => handleChange({ target: { name: "idioma", value } })}
            placeholder="Selecione o idioma"
            error={errors.idioma}
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <Input
            id="publicadoEm"
            name="publicadoEm"
            label="Data da Publicação"
            type="date"
            value={values.publicadoEm || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Campo de seleção múltipla: Categorias */}
      <MultiSelect
        options={categories || []}
        selectedValues={values.categoriaIds}
        onChange={(selected) => handleChange({ target: { name: "categoriaIds", value: selected } })}
        label="Categorias"
        placeholder="Selecione as categorias"
        disabled={loading}
      />
      {errors.categoriaIds && <p className="text-red-500 text-sm">{errors.categoriaIds}</p>}

      {/* Descrição */}
      <div>
        {/* Campo de texto: Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            value={values.descricao}
            onChange={handleChange}
            placeholder="Descrição do livro"
            disabled={loading}
          />
        </div>

        {/* Componente para upload da capa do livro */}
        <BookCoverUploader
          onFileChange={(file) => handleChange({ target: { name: "capa", value: file } })}
          onUrlChange={(url) => handleChange({ target: { name: "capa", value: url } })}
          initialUrl={typeof values.capa === "string" ? values.capa : ""}
          disabled={loading}
        />
        {errors.capa && <p className="text-red-500 text-sm">{errors.capa}</p>}

        {/* Botões de ação: Cancelar e Confirmar */}
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose} variant="back">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading ? true : false}>
            {textButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditBookModal;
