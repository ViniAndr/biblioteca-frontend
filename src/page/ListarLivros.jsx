import { useState } from "react";
import { LuBookX } from "react-icons/lu";
import SelectReact from "react-select";

// Components
import CardLivro from "../components/common/CardLivro";
import Botao from "../components/common/Botao";
import Carregamento from "../components/common/Carregamento";
import Pesquisa from "../components/common/Pesquisa";
import Paginacao from "../components/common/Paginacao";
import SeletorItensPorPagina from "../components/common/SeletorItensPorPagina";

// Hook
import { useLivros } from "../hooks/livro/useLivros";

import { formatarLivroParaHome } from "../utils/formatadores";

const ListarLivros = () => {
  const {
    livros,
    categorias,
    autores,
    editoras,
    filtro,
    carregando,
    pesquisa,
    setPesquisa,
    pagina,
    setPagina,
    totalPaginas,
    definirCampoFiltro,
    itensPorPagina,
    setItensPorPagina,
  } = useLivros(formatarLivroParaHome);

  // Estado local apenas para o input não travar
  const [textoBusca, setTextoBusca] = useState("");

  // Função auxiliar para mapear os arrays do banco para o padrão do react-select
  const formatarOpcoesFiltro = (itens) => {
    return (
      itens?.map((item) => ({
        value: item.id,
        label: item.nome,
      })) || []
    );
  };

  // Dados para criação dos selects de filtro (Idêntico ao da Dashboard)
  const selectsFiltroAtributo = [
    {
      nome: "categoria",
      opcoes: formatarOpcoesFiltro(categorias),
      placeholder: "Categorias",
    },
    {
      nome: "autor",
      opcoes: formatarOpcoesFiltro(autores),
      placeholder: "Autores",
    },
    {
      nome: "editora",
      opcoes: formatarOpcoesFiltro(editoras),
      placeholder: "Editoras",
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6 p-4 md:p-6 lg:p-8 bg-zinc-50 min-h-screen">
      {/*CABEÇALHO E BARRA DE FERRAMENTAS */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Catálogo de Livros</h1>
          <p className="text-sm text-zinc-500">Explore nosso acervo e faça suas reservas.</p>
        </div>

        {/* BARRA DE PESQUISA E FILTROS */}
        <div className="flex flex-col xl:flex-row gap-4 z-10">
          <div className="flex-grow">
            <Pesquisa value={pesquisa} onChange={setPesquisa} placeholder="Pesquisar livros..." />
          </div>

          {/* Selects de Filtros usando react-select */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            {selectsFiltroAtributo.map((select) => {
              // Encontra qual é o objeto selecionado atualmente para exibir na tela
              const valorAtual = select.opcoes.find((opt) => opt.value === filtro[select.nome]) || null;

              return (
                <div key={select.nome} className="min-w-[200px] flex-grow">
                  <SelectReact
                    options={select.opcoes}
                    value={valorAtual}
                    onChange={(opcaoSelecionada) => {
                      // Se o usuário clicar no "X" para limpar, o opcaoSelecionada vem como null
                      const valorParaDefinir = opcaoSelecionada ? opcaoSelecionada.value : "";
                      definirCampoFiltro(select.nome, valorParaDefinir);
                      setPagina(1); // Volta para a primeira página ao filtrar
                    }}
                    placeholder={select.placeholder}
                    isClearable={true}
                    isSearchable={true} // Aqui ativamos a digitação dentro do select!
                    noOptionsMessage={() => "Nenhum resultado encontrado"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "42px",
                        borderColor: "#d1d5db", // Corrigindo a cor da borda para bater com o input
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#9ca3af",
                        },
                      }),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ÁREA DE RESULTADOS */}
      <div className="flex-grow flex flex-col">
        {carregando ? (
          <Carregamento texto="Buscando livros no acervo..." alturaMinima="min-h-[400px] flex-grow" />
        ) : livros.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-zinc-500 gap-3 min-h-[400px]">
            <LuBookX size={60} className="text-zinc-300" />
            <p className="text-lg font-medium text-zinc-600">Nenhum livro encontrado.</p>
            {textoBusca && (
              <Botao variante="outline" onClick={() => setTextoBusca("")}>
                Limpar Busca
              </Botao>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {livros.map((livro) => (
              <div key={livro.id} className="flex justify-center">
                <CardLivro
                  titulo={livro.titulo}
                  autor={typeof livro.autor === "object" ? livro.autor?.nome : livro.autor}
                  capa={livro.capa}
                  categoria={livro.categoria}
                  totalEmprestimos={livro.totalEmprestimos || 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/*PAGINAÇÃO */}
      {!carregando && totalPaginas > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          {/* Seletor de Itens por Página */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <SeletorItensPorPagina itensPorPagina={itensPorPagina} setItensPorPagina={setItensPorPagina} />
          </div>

          {/* Botões de Navegação */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <Paginacao pagina={pagina} setPagina={setPagina} total={totalPaginas} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarLivros;
