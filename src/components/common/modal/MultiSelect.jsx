import { useState, useEffect, useRef } from "react";

/**
 * Componente MultiSelect para seleção múltipla de itens com funcionalidade de busca
 *
 * @param {Array} options - Lista de opções disponíveis para seleção (deve conter objetos com 'id' e 'nome')
 * @param {Array} [selectedValues=[]] - Array de valores atualmente selecionados
 * @param {Function} onChange - Função chamada quando a seleção é alterada
 * @param {String} [label="Categorias"] - Rótulo exibido acima do campo de seleção
 * @param {String} [placeholder="Buscar categoria..."] - Texto placeholder do campo de busca
 */
const MultiSelect = ({
  options,
  selectedValues = [],
  onChange,
  label = "Categorias",
  placeholder = "Buscar categoria...",
}) => {
  // Estado para controlar o texto de busca
  const [query, setQuery] = useState("");

  // Estado para controlar a visibilidade do dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Ref para o container principal (usado para detectar cliques fora)
  const wrapperRef = useRef(null);

  // Efeito para fechar o dropdown quando clicar fora do componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Filtra as opções disponíveis com base no texto de busca
   * Retorna apenas opções que:
   * 1. Correspondem ao texto da busca (case insensitive)
   * 2. Não estão já selecionadas
   */
  const filteredOptions = (options || []).filter(
    (opt) => opt.nome.toLowerCase().includes(query.toLowerCase()) && !selectedValues.includes(opt.id)
  );

  /**
   * Obtém os itens completos (com nome) dos valores selecionados
   */
  const selectedItems = options.filter((opt) => selectedValues.includes(opt.id));

  /**
   * Adiciona um novo item à seleção
   * @param {Number|String} id - ID do item a ser adicionado
   */
  const handleSelect = (id) => {
    onChange([...selectedValues, id]);
    setQuery(""); // Reseta a busca após seleção
    setIsOpen(false); // Fecha o dropdown
  };

  /**
   * Remove um item da seleção
   * @param {Number|String} id - ID do item a ser removido
   * @param {Event} e - Evento de clique (usado para stopPropagation)
   */
  const handleRemove = (id, e) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== id));
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Exibe o rótulo se fornecido */}
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      {/* Container principal do select */}
      <div
        className={`flex flex-wrap items-center gap-2 border ${
          isOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"
        } rounded-md p-2 cursor-text min-h-[42px] bg-white`}
        onClick={() => {
          setIsOpen(true);
          document.querySelector(".search-input")?.focus();
        }}
      >
        {/* Exibe os itens selecionados como tags */}
        {selectedItems.length > 0
          ? selectedItems.map((item) => (
              <div key={item.id} className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-sm">
                {item.nome}
                <button
                  type="button"
                  className="ml-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={(e) => handleRemove(item.id, e)}
                  aria-label={`Remover ${item.nome}`}
                >
                  ×
                </button>
              </div>
            ))
          : // Exibe o placeholder quando não há itens selecionados e não há busca
            !query && <span className="text-gray-400 text-sm pl-1">{placeholder}</span>}

        {/* Input de busca */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedItems.length > 0 ? "" : placeholder}
          className="search-input flex-1 outline-none px-1 py-1 min-w-[100px] text-sm bg-transparent"
          aria-label="Buscar categorias"
        />
      </div>

      {/* Dropdown com opções filtradas */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.id}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={() => handleSelect(opt.id)}
              >
                {opt.nome}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 text-sm">Nenhum resultado encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
