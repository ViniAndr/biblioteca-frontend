import { useState, useEffect } from "react";
import Input from "../../forms/Input";
import Button from "../Button";
import Select from "../../forms/Select";
import MultiSelect from "./MultiSelect";
import BookCoverUploader from "./BookCoverUploader";
import { useBookActions } from "../../../hooks/books/useBookActions";
import { useAllAttributes } from "../../../hooks/books/attributes/useAllAttributes";

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

  // Estado que armazena todos os dados do formulário
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

  // Função para criar ou editar os dados
  const handleSubmit = async () => {
    if (onConfirm) {
      await onConfirm(dataForm);
      onClose();
    }
  };

  //Atualiza um campo específico do formulário
  const updateField = (field, value) => {
    setDataForm((prev) => ({ ...prev, [field]: value }));
  };

  //Manipulador genérico para campos de input (texto)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    updateField(id, value);
  };

  // Manipulador genérico para campos numéricos
  const handleNumberChange = (e) => {
    const { id, value } = e.target;
    updateField(id, Number(value));
  };

  // Adicione esta função utilitária no topo do arquivo
  const safeValue = (value, fallback = "") => value ?? fallback;
  // Efeito para buscar dados da API quando o ISBN é fornecido e findAPI é true
  useEffect(() => {
    // Busca dados do livro na API do Google Books com base no ISBN
    const fetchData = async () => {
      if (!dataForm.isbn) return;

      const result = await findGoogleBooks(dataForm.isbn);

      if (!result?.error && result?.data) {
        setDataForm((prev) => ({
          ...prev,
          titulo: safeValue(result.data?.titulo),
          edicao: Number(safeValue(result.data?.edicao, 1)),
          autorId: Number(safeValue(result.data?.autor?.id, 0)),
          editoraId: Number(safeValue(result.data?.editora?.id, 0)),
          numeroPagina: Number(safeValue(result.data?.numeroPagina, 100)),
          publicadoEm: safeValue(result.data?.publicadoEm, new Date().toISOString().split("T")[0]),
          idioma: safeValue(result.data?.idioma),
          descricao: safeValue(result.data?.descricao),
          capa: safeValue(result.data?.capa),
        }));
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
              label="ISBN"
              placeholder="Digite o ISBN do livro"
              value={dataForm.isbn}
              onChange={handleInputChange}
            />
          </div>
          <Button className="h-10 " disabled={loading ? true : false} onClick={() => setFindAPI(!findAPI)}>
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
        label="Título"
        placeholder="Título do livro"
        value={dataForm.titulo}
        onChange={handleInputChange}
        required
        disabled={loading}
      />

      {/* Grupo de campos numéricos: Quantidade, Edição e Páginas */}
      <div className="flex gap-4">
        {[
          { id: "qtdCopias", label: "Quantidade de cópias", value: dataForm.qtdCopias },
          { id: "edicao", label: "Edição", value: dataForm.edicao },
          { id: "numeroPagina", label: "Número de Páginas", value: dataForm.numeroPagina },
        ].map(({ id, label, value }) => (
          <div className="flex-1" key={id}>
            <Input
              id={id}
              label={label}
              type="number"
              min="1"
              value={value}
              onChange={handleNumberChange}
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
            value={dataForm.autorId}
            onChange={(value) => updateField("autorId", Number(value))}
            placeholder="Selecione um autor"
            disabled={loading}
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
            value={dataForm.idioma}
            onChange={(value) => updateField("idioma", value)}
            valueKey="code"
            labelKey="language"
            placeholder="Selecione o idioma"
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <Input
            id="publicadoEm"
            label="Data da Publicação"
            type="date"
            value={dataForm.publicadoEm || ""}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Campo de seleção múltipla: Categorias */}
      <MultiSelect
        options={categories || []}
        selectedValues={dataForm.categoriaIds}
        onChange={(selected) => updateField("categoriaIds", selected)}
        label="Categorias"
        placeholder="Selecione as categorias"
        disabled={loading}
      />

      {/* Campo de texto: Descrição */}
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
          disabled={loading}
        />
      </div>

      {/* Componente para upload da capa do livro */}
      <BookCoverUploader
        onFileChange={(file) => updateField("capa", file)}
        onUrlChange={(url) => updateField("capa", url)}
        initialUrl={typeof dataForm.capa === "string" ? dataForm.capa : ""}
        disabled={loading}
      />

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
  );
};

export default CreateOrEditBookModal;
