import CreatableSelect from "react-select/creatable";

const CreatableSelectInput = ({
  label,
  options,
  value,
  onChange,
  onCreateOption,
  isLoading,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <CreatableSelect
        isDisabled={disabled}
        isLoading={isLoading}
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        onCreateOption={onCreateOption}
        placeholder={placeholder}
        isClearable
        formatCreateLabel={(inputValue) => `Criar novo: "${inputValue}"`}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
        // Estilização baseada no seu Tailwind
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

export default CreatableSelectInput;
