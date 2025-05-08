import { useState, useRef } from "react";
import Button from "../Button";

const BookCoverUploader = ({ onFileChange, onUrlChange, initialUrl = "" }) => {
  const [selectedOption, setSelectedOption] = useState("file"); // 'file' or 'url'
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [fileName, setFileName] = useState("Nenhuma imagem selecionada");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url.startsWith("http://") || url.startsWith("https://")) {
      onUrlChange(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Capa do Livro</h2>

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${selectedOption === "file" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedOption("file")}
        >
          Enviar Arquivo
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${selectedOption === "url" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedOption("url")}
        >
          URL da Imagem
        </button>
      </div>

      {selectedOption === "file" ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/gif"
          />
          <button type="button" onClick={triggerFileInput} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2">
            Clique para selecionar uma imagem
          </button>
          <p className="text-sm text-gray-500">{fileName}</p>
          <p className="text-xs text-gray-400 mt-2">Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB</p>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cole a URL da imagem</label>
          <input
            type="text"
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
