const Input = ({ id, name, type = "text", error, label, required = false, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="font-medium leading-none mb-1">
        {label}
      </label>
      <input
        className={`h-10 w-full rounded-md outline-0 border px-3 py-2 text-sm ${
          Boolean(error) ? "border-red-500" : "border-zinc-300"
        }`}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
