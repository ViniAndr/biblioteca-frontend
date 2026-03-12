import CreatableSelect from "react-select/creatable";

const MultiSelect = ({
  options,
  selectedValues = [],
  onChange,
  onCreateOption,
  isLoading,
  label = "Categorias",
  placeholder = "Selecione ou crie categorias...",
  disabled,
  error,
}) => {
  // Converte as suas categorias {id, nome} para o padrão do react-select {value, label}
  const formattedOptions = (options || []).map((opt) => ({
    value: opt.id,
    label: opt.nome,
  }));

  // Filtra as opções completas baseadas nos IDs que estão selecionados no formulário
  const selectedItems = formattedOptions.filter((opt) => selectedValues.includes(opt.value));

  // Quando o usuário seleciona/remove, pegamos apenas os IDs e mandamos de volta pro useForm
  const handleChange = (selectedArray) => {
    const ids = selectedArray ? selectedArray.map((item) => item.value) : [];
    onChange(ids);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <CreatableSelect
        isMulti // permite Multiplas opções
        isDisabled={disabled}
        isLoading={isLoading}
        options={formattedOptions}
        value={selectedItems}
        onChange={handleChange}
        onCreateOption={onCreateOption}
        placeholder={placeholder}
        noOptionsMessage={() => "Nenhuma categoria encontrada"}
        formatCreateLabel={(inputValue) => `Criar categoria: "${inputValue}"`}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
            "&:hover": { borderColor: state.isFocused ? "#3b82f6" : "#9ca3af" },
            borderRadius: "0.375rem",
            padding: "2px",
          }),
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelect;
