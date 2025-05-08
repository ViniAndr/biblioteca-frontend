import { useState, useEffect, useRef } from "react";

const MultiSelect = ({
  options,
  selectedValues = [],
  onChange,
  label = "Categorias",
  placeholder = "Buscar categoria...",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (opt) => opt.nome.toLowerCase().includes(query.toLowerCase()) && !selectedValues.includes(opt.id)
  );

  const handleSelect = (id) => {
    onChange([...selectedValues, id]);
    setQuery("");
    setIsOpen(false);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== id));
  };

  const selectedItems = options.filter((opt) => selectedValues.includes(opt.id));

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div
        className={`flex flex-wrap items-center gap-2 border ${
          isOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"
        } rounded-md p-2 cursor-text min-h-[42px] bg-white`}
        onClick={() => {
          setIsOpen(true);
          document.querySelector(".search-input")?.focus();
        }}
      >
        {selectedItems.length > 0
          ? selectedItems.map((item) => (
              <div key={item.id} className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-sm">
                {item.nome}
                <button
                  type="button"
                  className="ml-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={(e) => handleRemove(item.id, e)}
                >
                  ×
                </button>
              </div>
            ))
          : !query && <span className="text-gray-400 text-sm pl-1">{placeholder}</span>}

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
        />
      </div>

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
