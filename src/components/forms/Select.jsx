const Select = ({ id, name, error, label, required = true, value, onChange, options }) => {
  return (
    <div className="flex flex-col pt-1">
      <label htmlFor={id} className="font-medium leading-none mb-1">
        {label}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className={`h-10 w-full rounded-md outline-0 border px-3 py-2 text-sm ${
          Boolean(error) ? "border-red-500" : "border-zinc-300"
        }`}
      >
        <option value="" disabled>
          Selecione um estado
        </option>
        {/* Valor padrão */}
        {options?.map((optionValue, index) => (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      {error && <p className="mt text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
