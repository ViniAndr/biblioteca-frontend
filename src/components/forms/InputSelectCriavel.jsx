import CreatableSelect from "react-select/creatable";

const InputSelectCriavel = ({
  label,
  opcoes,
  valor,
  aoMudar,
  aoCriarOpcao,
  carregando,
  placeholder,
  erro,
  desabilitado,
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <CreatableSelect
        isDisabled={desabilitado}
        isLoading={carregando}
        options={opcoes}
        value={opcoes.find((opt) => opt.value === valor) || null}
        onChange={(selecionado) => aoMudar(selecionado ? selecionado.value : "")}
        onCreateOption={aoCriarOpcao}
        placeholder={placeholder}
        isClearable
        formatCreateLabel={(valorDigitado) => `Criar novo: "${valorDigitado}"`}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
        styles={{
          control: (estilosBase, estado) => ({
            ...estilosBase,
            borderColor: estado.isFocused ? "#3b82f6" : "#d1d5db",
            boxShadow: estado.isFocused ? "0 0 0 1px #3b82f6" : "none",
            "&:hover": { borderColor: estado.isFocused ? "#3b82f6" : "#9ca3af" },
            borderRadius: "0.375rem",
            padding: "2px",
          }),
        }}
      />
      {erro && <p className="text-red-500 text-sm mt-1">{erro}</p>}
    </div>
  );
};

export default InputSelectCriavel;
