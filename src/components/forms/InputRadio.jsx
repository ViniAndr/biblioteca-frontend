const InputRadio = ({ name, title, options, selectedValue, onChange }) => {
  return (
    <div>
      <p className="font-medium leading-none mb-3">{title}</p>
      <div className="flex gap-4">
        {options.map((opcao) => (
          <div key={opcao.value} className="flex items-center mb-2">
            <input
              type="radio"
              id={opcao.value}
              name={name}
              value={opcao.value}
              checked={selectedValue === opcao.value}
              onChange={onChange}
            />
            <label htmlFor={opcao.value} className="ml-2 text-sm  font-medium text-zinc-800">
              {opcao.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputRadio;