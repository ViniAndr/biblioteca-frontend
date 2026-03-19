const Input = ({
  id,
  name,
  type = "text",
  error,
  label,
  required = true,
  placeholder,
  value,
  onChange,
  className,
  inputType,
  component,
  buscarCep,
  carregandoCep,
  layout,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={`h-10 w-full rounded-md outline-0 border px-3 py-2 text-sm ${
          Boolean(error) ? "border-red-500" : "border-zinc-300"
        } ${className}`}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <p className="mt text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
