const InputRadio = ({ name, title, options, selectedValue, onChange }) => {
  return (
    <div>
      <p className="font-medium leading-none mb-3">{title}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center mb-2">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            <label htmlFor={option.value} className="ml-2 text-sm  font-medium text-zinc-800">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputRadio;
