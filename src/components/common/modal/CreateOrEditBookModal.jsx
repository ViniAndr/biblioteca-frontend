import { useState } from "react";
import Input from "../../forms/Input";
import Button from "../Button";
import Select from "../../forms/Select";
import MultiSelect from "./MultiSelect";
import BookCoverUploader from "./BookCoverUploader";

// Constantes fora do componente
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

const DEFAULT_CATEGORIES = [
  { id: 1, nome: "Fantasia" },
  { id: 2, nome: "Ficção Científica" },
  { id: 3, nome: "Terror" },
  { id: 4, nome: "Suspense" },
];

const CreateOrEditBookModal = ({ id, onClick, textButton, authors, publishers, categories }) => {
  const [data, setData] = useState({
    titulo: "",
    isbn: "",
    qtdCopias: 1,
    edicao: 1,
    autorId: 0,
    editoraId: 0,
    categoriaIds: [],
    numeroPagina: 100,
    publicadoEm: null,
    idioma: "",
    descricao: "",
    capa: "",
  });

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    updateField(id, value);
  };

  const handleNumberChange = (e) => {
    const { id, value } = e.target;
    updateField(id, Number(value));
  };

  const availableCategories = categories;

  return (
    <div className="pt-4 flex flex-col gap-4">
      {/* ISBN e botão buscar */}
      <div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              id="isbn"
              label="ISBN"
              placeholder="Digite o ISBN do livro"
              value={data.isbn}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={onClick} className="h-10">
            Buscar
          </Button>
        </div>
        <p className="text-sm font-light text-zinc-500 my-4">
          Digite o ISBN e clique em buscar para preencher automaticamente os dados do livro
        </p>
        <hr className="opacity-10" />
      </div>

      {/* Título */}
      <Input
        id="titulo"
        label="Título"
        placeholder="Título do livro"
        value={data.titulo}
        onChange={handleInputChange}
        required
      />

      {/* Quantidade, edição e páginas */}
      <div className="flex gap-4">
        {[
          { id: "qtdCopias", label: "Quantidade de cópias", value: data.qtdCopias },
          { id: "edicao", label: "Edição", value: data.edicao },
          { id: "numeroPagina", label: "Número de Páginas", value: data.numeroPagina },
        ].map(({ id, label, value }) => (
          <div className="flex-1" key={id}>
            <Input id={id} label={label} type="number" min="1" value={value} onChange={handleNumberChange} />
          </div>
        ))}
      </div>

      {/* Autor e Editora */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            id="autorId"
            label="Autor"
            options={authors}
            value={data.autorId}
            onChange={(value) => updateField("autorId", Number(value))}
            placeholder="Selecione um autor"
          />
        </div>
        <div className="flex-1">
          <Select
            id="editoraId"
            label="Editora"
            options={publishers}
            value={data.editoraId}
            onChange={(value) => updateField("editoraId", Number(value))}
            placeholder="Selecione uma editora"
          />
        </div>
      </div>

      {/* Idioma e publicação */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            id="idioma"
            label="Idioma"
            options={LANGUAGES}
            value={data.idioma}
            onChange={(value) => updateField("idioma", value)}
            valueKey="code"
            labelKey="language"
            placeholder="Selecione o idioma"
          />
        </div>
        <div className="flex-1">
          <Input
            id="publicadoEm"
            label="Data da Publicação"
            type="date"
            value={data.publicadoEm || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Categorias */}
      <MultiSelect
        options={availableCategories}
        selectedValues={data.categoriaIds}
        onChange={(selected) => updateField("categoriaIds", selected)}
        label="Categorias"
        placeholder="Selecione as categorias"
      />

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          value={data.descricao}
          onChange={handleInputChange}
          placeholder="Descrição do livro"
        />
      </div>

      {/* Upload de capa */}
      <BookCoverUploader
        onFileChange={(file) => updateField("capa", file)}
        onUrlChange={(url) => updateField("capa", url)}
        initialUrl={typeof data.capa === "string" ? data.capa : ""}
      />

      {/* Botões */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="back">Canelar</Button>
        <Button>{textButton}</Button>
      </div>
    </div>
  );
};

export default CreateOrEditBookModal;
