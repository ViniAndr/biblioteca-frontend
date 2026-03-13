import { useState, useEffect } from "react";

// Componentes
import Input from "../../forms/Input";
import Button from "../Button";
import Select from "../../forms/Select";
import MultiSelect from "./MultiSelect";
import BookCoverUploader from "./BookCoverUploader";
import CreatableSelectInput from "../../forms/CreatableSelectInput";

// Hooks e Validações
import { useBookActions } from "../../../hooks/books/useBookActions";
import { useAllAttributes } from "../../../hooks/books/attributes/useAllAttributes";
import { useBookAttributeActions } from "../../../hooks/books/attributes/useBookAttributesActions";
import useForm from "../../../hooks/useForm";
import * as validate from "../../../utils/validations";

// --- CONSTANTES E FUNÇÕES UTILITÁRIAS ---
// Movidos para fora do componente para não serem recriados a cada renderização
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

const formatOptions = (list) => list?.map((item) => ({ value: item.id, label: item.nome })) || [];
const safeValue = (value, fallback = "") => value ?? fallback;

// --- COMPONENTE PRINCIPAL ---
const CreateOrEditBookModal = ({ onClose, id, onConfirm, textButton }) => {
  // HOOKS DE DADOS (APIs e Banco)
  const { findGoogleBooks, viewDetails, loading: loadingGoogleApi } = useBookActions();
  const { authors: fetchedAuthors, publishers: fetchedPublishers, categories: fetchedCategories } = useAllAttributes();

  // HOOKS DE AÇÕES (Criação de atributos)
  const { actions: authorActions, isLoading: isAuthorLoading } = useBookAttributeActions("author");
  const { actions: publisherActions, isLoading: isPublisherLoading } = useBookAttributeActions("publisher");
  const { actions: categoryActions, isLoading: isCategoryLoading } = useBookAttributeActions("category");

  // ESTADOS LOCAIS
  const [authorsList, setAuthorsList] = useState([]);
  const [publishersList, setPublishersList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // INICIALIZAÇÃO DO FORMULÁRIO
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
      categoriaIds: validate.validateArrayRequired,
      capa: validate.validateRequiredField,
    },
  );

  // EFEITOS (Sincronização de dados do backend com listas locais)
  useEffect(() => {
    if (fetchedAuthors) setAuthorsList(fetchedAuthors);
  }, [fetchedAuthors]);

  useEffect(() => {
    if (fetchedPublishers) setPublishersList(fetchedPublishers);
  }, [fetchedPublishers]);

  useEffect(() => {
    if (fetchedCategories) setCategoriesList(fetchedCategories);
  }, [fetchedCategories]);

  // EFEITO: Carregar dados para o MODO EDIÇÃO
  useEffect(() => {
    const carregarLivroParaEdicao = async () => {
      if (id) {
        try {
          const result = await viewDetails(id);

          if (result?.data) {
            const livroSalvo = result.data;

            // 1. Limpa a edição
            const edicaoLimpa = String(livroSalvo.edicao).replace(/\D/g, "");

            // 2. Limpa o ISBN (tira os traços e deixa só números)
            const isbnLimpo = safeValue(livroSalvo.isbn).replace(/\D/g, "");

            // 3. Monta o link completo da capa (ajuste a porta 3000 se o seu backend rodar em outra)
            const URL_BACKEND = "http://localhost:3000";
            const capaCompleta = livroSalvo.capa?.startsWith("/")
              ? `${URL_BACKEND}${livroSalvo.capa}`
              : safeValue(livroSalvo.capa);

            const updates = {
              titulo: safeValue(livroSalvo.titulo),
              isbn: isbnLimpo, // <--- Agora vai limpinho pro input!
              qtdCopias: Number(safeValue(livroSalvo.qtdCopias, 1)),
              edicao: Number(safeValue(edicaoLimpa, 1)),
              autorId: Number(safeValue(livroSalvo.autor?.id, 0)),
              editoraId: Number(safeValue(livroSalvo.editora?.id, 0)),
              categoriaIds: livroSalvo.categoria?.map((cat) => cat.id) || [],
              numeroPagina: Number(safeValue(livroSalvo.numeroPagina, 100)),
              publicadoEm: safeValue(livroSalvo.publicadoEm, "").split("T")[0],
              idioma: safeValue(livroSalvo.idioma),
              descricao: safeValue(livroSalvo.descricao),
              capa: capaCompleta, // <--- Agora é um link HTTP válido!
            };

            // Simula o evento de digitação
            Object.entries(updates).forEach(([key, val]) => {
              handleChange({ target: { name: key, value: val } });
            });
          }
        } catch (error) {
          console.error("Falha ao puxar dados do livro para edição", error);
        }
      }
    };

    carregarLivroParaEdicao();
  }, [id]);

  // --- HANDLERS E FUNÇÕES DE AÇÃO ---

  // Função disparada ao clicar no botão "Buscar" ISBN
  const handleSearchISBN = async () => {
    if (!values.isbn) return;

    const result = await findGoogleBooks(values.isbn);

    if (!result?.error && result?.data) {
      // Injetar o novo autor/editora na lista local se eles vierem da API e não existirem
      const novoAutor = result.data?.autor;
      if (novoAutor && !authorsList.find((a) => a.id === novoAutor.id)) {
        setAuthorsList((prev) => [...prev, novoAutor]);
      }

      const novaEditora = result.data?.editora;
      if (novaEditora && !publishersList.find((p) => p.id === novaEditora.id)) {
        setPublishersList((prev) => [...prev, novaEditora]);
      }

      // Monta o objeto com os dados encontrados e atualiza o formulário
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

  const handleCreateAuthor = async (inputValue) => {
    const response = await authorActions.create({ nome: inputValue });
    if (response.success) {
      const novoAutor = response.data?.data || response.data;
      if (novoAutor && novoAutor.id) {
        setAuthorsList((prev) => [...prev, novoAutor]);
        handleChange({ target: { name: "autorId", value: novoAutor.id } });
      }
    }
  };

  const handleCreatePublisher = async (inputValue) => {
    const response = await publisherActions.create({ nome: inputValue });
    if (response.success) {
      const novaEditora = response.data?.data || response.data;
      if (novaEditora && novaEditora.id) {
        setPublishersList((prev) => [...prev, novaEditora]);
        handleChange({ target: { name: "editoraId", value: novaEditora.id } });
      }
    }
  };

  const handleCreateCategory = async (inputValue) => {
    const response = await categoryActions.create({ nome: inputValue });
    if (response.success) {
      const novaCategoria = response.data?.data || response.data;
      if (novaCategoria && novaCategoria.id) {
        setCategoriesList((prev) => [...prev, novaCategoria]);
        handleChange({
          target: { name: "categoriaIds", value: [...values.categoriaIds, novaCategoria.id] },
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    if (onConfirm) {
      setIsSubmitting(true);
      try {
        // CÓPIA dos valores do formulário.
        const dadosTratados = { ...values };

        // Se a capa for um texto (string) e começar com o nosso localhost...
        const URL_BACKEND = "http://localhost:3000";

        if (typeof dadosTratados.capa === "string" && dadosTratados.capa.startsWith(URL_BACKEND)) {
          // vou remover o "http://localhost:3000" e deixamos só o "/api/uploads/..."
          dadosTratados.capa = dadosTratados.capa.replace(URL_BACKEND, "");
        }

        // envio dos dados limpos para a função que vai chamar a API
        await onConfirm(dadosTratados);
        onClose();
      } catch (error) {
        console.error("Erro ao salvar:", error);
        setIsSubmitting(false);
      }
    }
  };

  // RENDERIZAÇÃO
  return (
    <div className="pt-4 flex flex-col gap-4">
      {/* Seção: Busca por ISBN */}
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
          <Button className="h-10" disabled={loadingGoogleApi || isSubmitting} onClick={handleSearchISBN}>
            Buscar
          </Button>
        </div>
        <p className="text-sm font-light text-zinc-500 my-4">
          Digite o ISBN e clique em buscar para preencher automaticamente os dados do livro
        </p>
        <hr className="opacity-10" />
      </div>

      {/* Seção: Título */}
      <Input
        id="titulo"
        name="titulo"
        label="Título"
        placeholder="Título do livro"
        value={values.titulo}
        onChange={handleChange}
        error={errors.titulo}
        disabled={loadingGoogleApi || isSubmitting}
      />

      {/* Seção: Números (Cópias, Edição, Páginas) */}
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
              disabled={loadingGoogleApi || isSubmitting}
            />
          </div>
        ))}
      </div>

      {/* Seção: Autor e Editora */}
      <div className="flex gap-4">
        <div className="flex-1">
          <CreatableSelectInput
            label="Autor"
            options={formatOptions(authorsList)}
            value={values.autorId}
            onChange={(value) => handleChange({ target: { name: "autorId", value } })}
            onCreateOption={handleCreateAuthor}
            isLoading={isAuthorLoading("create")}
            placeholder="Selecione ou crie um autor"
            error={errors.autorId}
            disabled={loadingGoogleApi || isSubmitting}
          />
        </div>
        <div className="flex-1">
          <CreatableSelectInput
            label="Editora"
            options={formatOptions(publishersList)}
            value={values.editoraId}
            onChange={(value) => handleChange({ target: { name: "editoraId", value } })}
            onCreateOption={handleCreatePublisher}
            isLoading={isPublisherLoading("create")}
            placeholder="Selecione ou crie uma editora"
            error={errors.editoraId}
            disabled={loadingGoogleApi || isSubmitting}
          />
        </div>
      </div>

      {/* Seção: Idioma e Data */}
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
            disabled={loadingGoogleApi || isSubmitting}
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
            disabled={loadingGoogleApi || isSubmitting}
          />
        </div>
      </div>

      {/* Seção: Categorias */}
      <MultiSelect
        options={categoriesList}
        selectedValues={values.categoriaIds}
        onChange={(selectedIds) => handleChange({ target: { name: "categoriaIds", value: selectedIds } })}
        onCreateOption={handleCreateCategory}
        isLoading={isCategoryLoading("create")}
        label="Categorias"
        placeholder="Selecione ou crie as categorias"
        disabled={loadingGoogleApi || isSubmitting}
        error={errors.categoriaIds}
      />

      {/* Seção: Descrição e Capa */}
      <div>
        <div className="mb-4">
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
            disabled={loadingGoogleApi || isSubmitting}
          />
        </div>

        <BookCoverUploader
          onFileChange={(file) => handleChange({ target: { name: "capa", value: file } })}
          onUrlChange={(url) => handleChange({ target: { name: "capa", value: url } })}
          initialUrl={typeof values.capa === "string" ? values.capa : ""}
          disabled={loadingGoogleApi || isSubmitting}
        />
        {errors.capa && <p className="text-red-500 text-sm">{errors.capa}</p>}

        {/* Botões do Rodapé */}
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose} variant="back" disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loadingGoogleApi || isSubmitting}>
            {isSubmitting ? "Aguarde..." : textButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditBookModal;
