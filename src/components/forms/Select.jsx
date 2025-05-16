const Select = ({
  id,
  name,
  error,
  label,
  required = true,
  value,
  onChange,
  options = [],
  defaultOptionLabel = "Selecione...",
  filterKey = null, // Chave do objeto para o filtro
  // Esses dois atributos abaixo serve para quando o options for um array de objetos
  valueKey = "id", // Chave do objeto para o value
  labelKey = "nome", // Chave do objeto para o label
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={(e) => (filterKey ? onChange(filterKey, e.target.value) : onChange(e.target.value))}
        className={`h-10 w-full border rounded-md py-2 px-3 outline-none appearance-none cursor-pointer ${
          Boolean(error) ? "border-red-500" : "border-zinc-300"
        }`}
        {...rest}
      >
        <option value="">{defaultOptionLabel}</option>
        {options?.length > 0 &&
          options.map((option, index) => {
            const optionValue = typeof option === "object" ? option[valueKey] : option;
            const optionLabel = typeof option === "object" ? option[labelKey] : option;
            return (
              <option key={index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
      </select>
      {error && <p className="mt text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
