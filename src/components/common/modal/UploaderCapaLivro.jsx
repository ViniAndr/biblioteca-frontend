import { useState, useEffect, useRef } from "react";
import Botao from "../Botao";

//Componente para upload da capa do livro via arquivo ou URL
const UploaderCapaLivro = ({ aoMudarArquivo, aoMudarUrl, urlInicial = "", desabilitado }) => {
  // Estados do componente - garantir que urlImagem nunca será undefined
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(urlInicial ? "url" : "arquivo");
  const [urlImagem, setUrlImagem] = useState(urlInicial || "");
  const [nomeArquivo, setNomeArquivo] = useState("Nenhuma imagem selecionada");
  const inputArquivoRef = useRef(null);

  // Efeito para sincronizar com a URL inicial
  useEffect(() => {
    if (urlInicial) {
      setUrlImagem(urlInicial);
      setOpcaoSelecionada("url");
    } else {
      setUrlImagem(""); // Garante que urlImagem nunca será undefined
    }
  }, [urlInicial]);

  //Manipula a seleção de arquivo
  const lidarComMudancaArquivo = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setNomeArquivo(arquivo.name);
      aoMudarArquivo(arquivo);
    }
  };

  //Manipula a alteração da URL
  const lidarComMudancaUrl = (e) => {
    const url = e.target.value;
    setUrlImagem(url || ""); // Garante que nunca será undefined

    // Valida e chama o callback apenas para URLs válidas
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      aoMudarUrl(url);
    }
  };

  //Dispara o clique no input de arquivo oculto
  const dispararInputArquivo = () => {
    inputArquivoRef.current?.click();
  };

  // Opções de upload disponíveis
  const opcoesUpload = [
    { value: "arquivo", label: "Enviar Arquivo" },
    { value: "url", label: "URL da Imagem" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Capa do Livro</h2>

      {/* Seletor do método de upload */}
      <div className="flex mb-4 bg-zinc-200 rounded">
        {opcoesUpload.map((opcao) => (
          <div key={opcao.value} className="flex-1">
            <Botao
              tamanho="full"
              variante={opcaoSelecionada === opcao.value ? "back" : "muted"}
              onClick={() => setOpcaoSelecionada(opcao.value)}
            >
              {opcao.label}
            </Botao>
          </div>
        ))}
      </div>

      {/* Upload por arquivo */}
      {opcaoSelecionada === "arquivo" && (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <input
            type="file"
            id="arquivoCapaLivro"
            ref={inputArquivoRef}
            onChange={lidarComMudancaArquivo}
            className="hidden"
            accept="image/jpeg, image/png, image/gif"
          />
          <Botao variante="outline" onClick={dispararInputArquivo}>
            Clique para selecionar uma imagem
          </Botao>
          <p className="text-sm text-gray-500 my-2">{nomeArquivo}</p>
          <p className="text-xs text-gray-400">Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB</p>
        </div>
      )}

      {/* Upload por URL */}
      {opcaoSelecionada === "url" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cole a URL da imagem</label>
          <input
            type="text"
            id="urlCapaLivro"
            name="urlCapaLivro"
            value={urlImagem}
            onChange={lidarComMudancaUrl}
            placeholder="Cole a URL completa da imagem (deve começar com http:// ou https://)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={desabilitado}
          />
          {urlImagem && !urlImagem.startsWith("http://") && !urlImagem.startsWith("https://") && (
            <p className="text-sm text-red-500">A URL deve começar com http:// ou https://</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploaderCapaLivro;
