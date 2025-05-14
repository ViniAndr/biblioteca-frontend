import { useState, useEffect } from "react";
import Input from "../../forms/Input";
import Button from "../Button";
import Select from "../../forms/Select";
import MultiSelect from "./MultiSelect";
import BookCoverUploader from "./BookCoverUploader";
import { useBookActions } from "../../../hooks/books/useBookActions";
import { useAllAttributes } from "../../../hooks/books/attributes/useAllAttributes";

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

const CreateOrEditBookModal = ({ onClose, id, onClick, textButton }) => {
  const { findGoogleBooks, loading } = useBookActions();
  const { authors, publishers, categories, loading: loadingAttrs } = useAllAttributes();

  const [findAPI, setFindAPI] = useState(false);
  const [dataForm, setDataForm] = useState({
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
  });

  // Métodos Auxiliares
  const updateField = (field, value) => {
    setDataForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    updateField(id, value);
  };

  const handleNumberChange = (e) => {
    const { id, value } = e.target;
    updateField(id, Number(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!dataForm.isbn) return;

      const result = await findGoogleBooks(dataForm.isbn);
      console.log("Resultado: ", result);
      if (!result?.error && result?.data) {
        setDataForm((prev) => ({
          ...prev,
          titulo: result.data?.titulo,
          edicao: result.data?.edicao,
          autorId: result.data?.autor?.id || 0,
          editoraId: result.data?.editora?.id || 0,
          numeroPagina: result.data?.numeroPagina,
          publicadoEm: result.data?.publicadoEm,
          idioma: result.data?.idioma,
          descricao: result.data?.descricao,
          capa: result.data?.capa,
        }));
      }
    };

    if (findAPI) fetchData();
    // console.log("Data Form: ", dataForm);
    // console.log("Botão: ", findAPI);
  }, [findAPI]);

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
              value={dataForm.isbn}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={() => setFindAPI(!findAPI)} className="h-10">
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
        value={dataForm.titulo}
        onChange={handleInputChange}
        required
      />

      {/* Quantidade, edição e páginas */}
      <div className="flex gap-4">
        {[
          { id: "qtdCopias", label: "Quantidade de cópias", value: dataForm.qtdCopias },
          { id: "edicao", label: "Edição", value: dataForm.edicao },
          { id: "numeroPagina", label: "Número de Páginas", value: dataForm.numeroPagina },
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
            value={dataForm.autorId}
            onChange={(value) => updateField("autorId", Number(value))}
            placeholder="Selecione um autor"
          />
        </div>
        <div className="flex-1">
          <Select
            id="editoraId"
            label="Editora"
            options={publishers}
            value={dataForm.editoraId}
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
            value={dataForm.idioma}
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
            value={dataForm.publicadoEm || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Categorias */}
      <MultiSelect
        options={categories || []}
        selectedValues={dataForm.categoriaIds}
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
          value={dataForm.descricao}
          onChange={handleInputChange}
          placeholder="Descrição do livro"
        />
      </div>

      {/* Upload de capa */}
      <BookCoverUploader
        onFileChange={(file) => updateField("capa", file)}
        onUrlChange={(url) => updateField("capa", url)}
        initialUrl={typeof dataForm.capa === "string" ? dataForm.capa : ""}
      />

      {/* Botões */}
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={onClose} variant="back">
          Canelar
        </Button>
        <Button>{textButton}</Button>
      </div>
    </div>
  );
};

export default CreateOrEditBookModal;
