import CreatableSelect from "react-select/creatable";

const SelectMultiplo = ({
  opcoes,
  valoresSelecionados = [],
  aoMudar,
  aoCriarOpcao,
  carregando,
  label = "Categorias",
  placeholder = "Selecione ou crie categorias...",
  desabilitado,
  erro,
}) => {
  // Converte as suas categorias {id, nome} para o padrão do react-select {value, label}
  const opcoesFormatadas = (opcoes || []).map((opt) => ({
    value: opt.id,
    label: opt.nome,
  }));

  // Filtra as opções completas baseadas nos IDs que estão selecionados no formulário
  const itensSelecionados = opcoesFormatadas.filter((opt) => valoresSelecionados.includes(opt.value));

  // Quando o usuário seleciona/remove, pegamos apenas os IDs e mandamos de volta pro useFormulario
  const lidarComMudanca = (arraySelecionado) => {
    const ids = arraySelecionado ? arraySelecionado.map((item) => item.value) : [];
    aoMudar(ids);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <CreatableSelect
        isMulti // permite Multiplas opções
        isDisabled={desabilitado}
        isLoading={carregando}
        options={opcoesFormatadas}
        value={itensSelecionados}
        onChange={lidarComMudanca}
        onCreateOption={aoCriarOpcao}
        placeholder={placeholder}
        noOptionsMessage={() => "Nenhuma categoria encontrada"}
        formatCreateLabel={(valorDigitado) => `Criar categoria: "${valorDigitado}"`}
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

export default SelectMultiplo;