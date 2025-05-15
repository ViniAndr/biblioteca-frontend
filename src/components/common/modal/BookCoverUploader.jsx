import { useState, useEffect, useRef } from "react";
import Button from "../Button";

//Componente para upload da capa do livro via arquivo ou URL
const BookCoverUploader = ({ onFileChange, onUrlChange, initialUrl = "" }) => {
  // Estados do componente - garantimos que imageUrl nunca será undefined
  const [selectedOption, setSelectedOption] = useState(initialUrl ? "url" : "file");
  const [imageUrl, setImageUrl] = useState(initialUrl || "");
  const [fileName, setFileName] = useState("Nenhuma imagem selecionada");
  const fileInputRef = useRef(null);

  // Efeito para sincronizar com a URL inicial
  useEffect(() => {
    if (initialUrl) {
      setImageUrl(initialUrl);
      setSelectedOption("url");
    } else {
      setImageUrl(""); // Garante que imageUrl nunca será undefined
    }
  }, [initialUrl]);

  //Manipula a seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  //Manipula a alteração da URL
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url || ""); // Garante que nunca será undefined

    // Valida e chama o callback apenas para URLs válidas
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      onUrlChange(url);
    }
  };

  //Dispara o clique no input de arquivo oculto
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Opções de upload disponíveis
  const uploadOptions = [
    { value: "file", label: "Enviar Arquivo" },
    { value: "url", label: "URL da Imagem" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Capa do Livro</h2>

      {/* Seletor do método de upload */}
      <div className="flex mb-4 bg-zinc-200 rounded">
        {uploadOptions.map((option) => (
          <div key={option.value} className="flex-1">
            <Button
              size="full"
              variant={selectedOption === option.value ? "back" : "muted"}
              onClick={() => setSelectedOption(option.value)}
            >
              {option.label}
            </Button>
          </div>
        ))}
      </div>

      {/* Upload por arquivo */}
      {selectedOption === "file" && (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <input
            type="file"
            id="bookCoverFile"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/gif"
          />
          <Button variant="outline" onClick={triggerFileInput}>
            Clique para selecionar uma imagem
          </Button>
          <p className="text-sm text-gray-500 my-2">{fileName}</p>
          <p className="text-xs text-gray-400">Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB</p>
        </div>
      )}

      {/* Upload por URL */}
      {selectedOption === "url" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cole a URL da imagem</label>
          <input
            type="text"
            id="bookCoverUrl"
            name="bookCoverUrl"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Cole a URL completa da imagem (deve começar com http:// ou https://)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {imageUrl && !imageUrl.startsWith("http://") && !imageUrl.startsWith("https://") && (
            <p className="text-sm text-red-500">A URL deve começar com http:// ou https://</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCoverUploader;
