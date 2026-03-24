import { useState, useEffect } from "react";

// Componentes
import Input from "../../forms/Input";
import Botao from "../Botao";
import Select from "../../forms/Select";
import SelectMultiplo from "./SelectMultiplo";
import UploaderCapaLivro from "./UploaderCapaLivro";
import InputSelectCriavel from "../../forms/InputSelectCriavel";

// Hooks e Validações
import { useAcoesLivro } from "../../../hooks/livro/useAcoesLivro";
import { useTodosAtributos } from "../../../hooks/livro/atributos/useTodosAtributos";
import { useAcoesAtributosLivro } from "../../../hooks/livro/atributos/useAcoesAtributosLivro";
import useFormulario from "../../../hooks/useFormulario";
import * as validacoes from "../../../utils/validacoes";

// --- CONSTANTES E FUNÇÕES UTILITÁRIAS ---
const IDIOMAS = [
  { codigo: "pt-BR", idioma: "Português (Brasil)" },
  { codigo: "pt-PT", idioma: "Português (Portugal)" },
  { codigo: "en", idioma: "Inglês" },
  { codigo: "es", idioma: "Espanhol" },
  { codigo: "fr", idioma: "Francês" },
  { codigo: "de", idioma: "Alemão" },
  { codigo: "it", idioma: "Italiano" },
  { codigo: "ja", idioma: "Japonês" },
];

const formatarOpcoes = (lista) => lista?.map((item) => ({ value: item.id, label: item.nome })) || [];
const valorSeguro = (valor, fallback = "") => valor ?? fallback;

// --- COMPONENTE PRINCIPAL ---
const ModalCriarOuEditarLivro = ({ aoFechar, id, aoConfirmar, textoBotao }) => {
  // HOOKS DE DADOS (APIs e Banco)
  const { buscarNaApiGoogle, visualizarDetalhes, carregando: carregandoApiGoogle } = useAcoesLivro();
  const { autores: autoresBuscados, editoras: editorasBuscadas, categorias: categoriasBuscadas } = useTodosAtributos();

  // HOOKS DE AÇÕES (Criação de atributos)
  const { acoes: acoesAutor, estaCarregando: carregandoAutor } = useAcoesAtributosLivro("autor");
  const { acoes: acoesEditora, estaCarregando: carregandoEditora } = useAcoesAtributosLivro("editora");
  const { acoes: acoesCategoria, estaCarregando: carregandoCategoria } = useAcoesAtributosLivro("categoria");

  // ESTADOS LOCAIS
  const [listaAutores, setListaAutores] = useState([]);
  const [listaEditoras, setListaEditoras] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [estaEnviando, setEstaEnviando] = useState(false);

  // INICIALIZAÇÃO DO FORMULÁRIO
  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
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
      estante: "",
      prateleira: "",
    },
    {
      titulo: validacoes.validarCampoObrigatorio,
      isbn: validacoes.validarISBN,
      qtdCopias: validacoes.validarInteiroPositivo,
      edicao: validacoes.validarInteiroPositivo,
      numeroPagina: validacoes.validarInteiroPositivo,
      autorId: validacoes.validarCampoSelect,
      editoraId: validacoes.validarCampoSelect,
      idioma: validacoes.validarCampoSelect,
      categoriaIds: validacoes.validarArrayObrigatorio,
      capa: validacoes.validarCampoObrigatorio,
    },
  );

  // EFEITOS
  useEffect(() => {
    if (autoresBuscados) setListaAutores(autoresBuscados);
  }, [autoresBuscados]);

  useEffect(() => {
    if (editorasBuscadas) setListaEditoras(editorasBuscadas);
  }, [editorasBuscadas]);

  useEffect(() => {
    if (categoriasBuscadas) setListaCategorias(categoriasBuscadas);
  }, [categoriasBuscadas]);

  useEffect(() => {
    const carregarLivroParaEdicao = async () => {
      if (id) {
        try {
          const resultado = await visualizarDetalhes(id);

          if (resultado?.data) {
            const livroSalvo = resultado.data;

            const edicaoLimpa = String(livroSalvo.edicao).replace(/\D/g, "");
            const isbnLimpo = valorSeguro(livroSalvo.isbn).replace(/\D/g, "");

            const URL_BACKEND = "http://localhost:3000";
            const capaCompleta = livroSalvo.capa?.startsWith("/")
              ? `${URL_BACKEND}${livroSalvo.capa}`
              : valorSeguro(livroSalvo.capa);

            const atualizacoes = {
              titulo: valorSeguro(livroSalvo.titulo),
              isbn: isbnLimpo,
              qtdCopias: Number(valorSeguro(livroSalvo.qtdCopias, 1)),
              edicao: Number(valorSeguro(edicaoLimpa, 1)),
              autorId: Number(valorSeguro(livroSalvo.autor?.id, 0)),
              editoraId: Number(valorSeguro(livroSalvo.editora?.id, 0)),
              categoriaIds: livroSalvo.categoria?.map((cat) => cat.id) || [],
              numeroPagina: Number(valorSeguro(livroSalvo.numeroPagina, 100)),
              publicadoEm: valorSeguro(livroSalvo.publicadoEm, "").split("T")[0],
              idioma: valorSeguro(livroSalvo.idioma),
              descricao: valorSeguro(livroSalvo.descricao),
              capa: capaCompleta,
              estante: valorSeguro(livroSalvo.estante),
              prateleira: valorSeguro(livroSalvo.prateleira),
            };

            Object.entries(atualizacoes).forEach(([chave, valor]) => {
              lidarComMudanca({ target: { name: chave, value: valor } });
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
  const lidarComBuscaISBN = async () => {
    if (!valores.isbn) return;

    const resultado = await buscarNaApiGoogle(valores.isbn);

    if (!resultado?.error && resultado?.data) {
      const novoAutor = resultado.data?.autor;
      if (novoAutor && !listaAutores.find((a) => a.id === novoAutor.id)) {
        setListaAutores((prev) => [...prev, novoAutor]);
      }

      const novaEditora = resultado.data?.editora;
      if (novaEditora && !listaEditoras.find((p) => p.id === novaEditora.id)) {
        setListaEditoras((prev) => [...prev, novaEditora]);
      }

      const atualizacoes = {
        titulo: resultado.data?.titulo,
        edicao: Number(valorSeguro(resultado.data?.edicao, 1)),
        autorId: Number(valorSeguro(resultado.data?.autor?.id, 0)),
        editoraId: Number(valorSeguro(resultado.data?.editora?.id, 0)),
        numeroPagina: Number(valorSeguro(resultado.data?.numeroPagina, 100)),
        publicadoEm: valorSeguro(resultado.data?.publicadoEm, new Date().toISOString().split("T")[0]),
        idioma: valorSeguro(resultado.data?.idioma),
        descricao: valorSeguro(resultado.data?.descricao),
        capa: valorSeguro(resultado.data?.capa),
      };

      Object.entries(atualizacoes).forEach(([chave, val]) => {
        lidarComMudanca({ target: { name: chave, value: val } });
      });
    }
  };

  const lidarComCriacaoAutor = async (valorDigitado) => {
    const resposta = await acoesAutor.criar({ nome: valorDigitado });
    if (resposta.success) {
      const novoAutor = resposta.data?.data || resposta.data;
      if (novoAutor && novoAutor.id) {
        setListaAutores((prev) => [...prev, novoAutor]);
        lidarComMudanca({ target: { name: "autorId", value: novoAutor.id } });
      }
    }
  };

  const lidarComCriacaoEditora = async (valorDigitado) => {
    const resposta = await acoesEditora.criar({ nome: valorDigitado });
    if (resposta.success) {
      const novaEditora = resposta.data?.data || resposta.data;
      if (novaEditora && novaEditora.id) {
        setListaEditoras((prev) => [...prev, novaEditora]);
        lidarComMudanca({ target: { name: "editoraId", value: novaEditora.id } });
      }
    }
  };

  const lidarComCriacaoCategoria = async (valorDigitado) => {
    const resposta = await acoesCategoria.criar({ nome: valorDigitado });
    if (resposta.success) {
      const novaCategoria = resposta.data?.data || resposta.data;
      if (novaCategoria && novaCategoria.id) {
        setListaCategorias((prev) => [...prev, novaCategoria]);
        lidarComMudanca({
          target: { name: "categoriaIds", value: [...valores.categoriaIds, novaCategoria.id] },
        });
      }
    }
  };

  const lidarComEnvio = async () => {
    if (!validarTudo()) return;

    if (aoConfirmar) {
      setEstaEnviando(true);
      try {
        const dadosTratados = { ...valores };
        const URL_BACKEND = "http://localhost:3000";

        if (typeof dadosTratados.capa === "string" && dadosTratados.capa.startsWith(URL_BACKEND)) {
          dadosTratados.capa = dadosTratados.capa.replace(URL_BACKEND, "");
        }

        await aoConfirmar(dadosTratados);
        aoFechar();
      } catch (error) {
        console.error("Erro ao salvar:", error);
        setEstaEnviando(false);
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
              value={valores.isbn}
              onChange={lidarComMudanca}
              error={erros.isbn}
            />
          </div>
          <Botao className="h-10" disabled={carregandoApiGoogle || estaEnviando} onClick={lidarComBuscaISBN}>
            Buscar
          </Botao>
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
        value={valores.titulo}
        onChange={lidarComMudanca}
        error={erros.titulo}
        disabled={carregandoApiGoogle || estaEnviando}
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
              value={valores[id]}
              onChange={lidarComMudanca}
              error={erros[id]}
              disabled={carregandoApiGoogle || estaEnviando}
            />
          </div>
        ))}
      </div>

      {/* Seção: Autor e Editora */}
      <div className="flex gap-4">
        <div className="flex-1">
          <InputSelectCriavel
            label="Autor"
            opcoes={formatarOpcoes(listaAutores)}
            valor={valores.autorId}
            aoMudar={(valor) => lidarComMudanca({ target: { name: "autorId", value: valor } })}
            aoCriarOpcao={lidarComCriacaoAutor}
            carregando={carregandoAutor("criar")}
            placeholder="Selecione ou crie um autor"
            erro={erros.autorId}
            desabilitado={carregandoApiGoogle || estaEnviando}
          />
        </div>
        <div className="flex-1">
          <InputSelectCriavel
            label="Editora"
            opcoes={formatarOpcoes(listaEditoras)}
            valor={valores.editoraId}
            aoMudar={(valor) => lidarComMudanca({ target: { name: "editoraId", value: valor } })}
            aoCriarOpcao={lidarComCriacaoEditora}
            carregando={carregandoEditora("criar")}
            placeholder="Selecione ou crie uma editora"
            erro={erros.editoraId}
            desabilitado={carregandoApiGoogle || estaEnviando}
          />
        </div>
      </div>

      {/* Seção: Idioma e Data */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            id="idioma"
            name="idioma"
            label="Idioma"
            options={IDIOMAS}
            value={valores.idioma}
            chaveValor="codigo"
            chaveRotulo="idioma"
            onChange={(valor) => lidarComMudanca({ target: { name: "idioma", value: valor } })}
            textoPadraoOpcao="Selecione o idioma"
            error={erros.idioma}
            disabled={carregandoApiGoogle || estaEnviando}
          />
        </div>
        <div className="flex-1">
          <Input
            id="publicadoEm"
            name="publicadoEm"
            label="Data da Publicação"
            type="date"
            value={valores.publicadoEm || ""}
            onChange={lidarComMudanca}
            disabled={carregandoApiGoogle || estaEnviando}
          />
        </div>
      </div>

      {/* Seção: Localização (Estante e Prateleira) */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            id="estante"
            name="estante"
            label="Estante"
            placeholder="Ex: A, B, Principal..."
            value={valores.estante}
            onChange={lidarComMudanca}
            disabled={carregandoApiGoogle || estaEnviando}
          />
        </div>
        <div className="flex-1">
          <Input
            id="prateleira"
            name="prateleira"
            label="Prateleira"
            placeholder="Ex: 1, 2, Superior..."
            value={valores.prateleira}
            onChange={lidarComMudanca}
            disabled={carregandoApiGoogle || estaEnviando}
          />
        </div>
      </div>

      {/* Seção: Categorias */}
      <SelectMultiplo
        opcoes={listaCategorias}
        valoresSelecionados={valores.categoriaIds}
        aoMudar={(idsSelecionados) => lidarComMudanca({ target: { name: "categoriaIds", value: idsSelecionados } })}
        aoCriarOpcao={lidarComCriacaoCategoria}
        carregando={carregandoCategoria("criar")}
        label="Categorias"
        placeholder="Selecione ou crie as categorias"
        desabilitado={carregandoApiGoogle || estaEnviando}
        erro={erros.categoriaIds}
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
            value={valores.descricao}
            onChange={lidarComMudanca}
            placeholder="Descrição do livro"
            disabled={carregandoApiGoogle || estaEnviando}
          />
        </div>

        <UploaderCapaLivro
          aoMudarArquivo={(arquivo) => lidarComMudanca({ target: { name: "capa", value: arquivo } })}
          aoMudarUrl={(url) => lidarComMudanca({ target: { name: "capa", value: url } })}
          urlInicial={typeof valores.capa === "string" ? valores.capa : ""}
          desabilitado={carregandoApiGoogle || estaEnviando}
        />
        {erros.capa && <p className="text-red-500 text-sm">{erros.capa}</p>}

        {/* Botões do Rodapé */}
        <div className="flex justify-end gap-4 mt-6">
          <Botao onClick={aoFechar} variante="back" disabled={estaEnviando}>
            Cancelar
          </Botao>
          <Botao onClick={lidarComEnvio} disabled={carregandoApiGoogle || estaEnviando}>
            {estaEnviando ? "Aguarde..." : textoBotao}
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarOuEditarLivro;
