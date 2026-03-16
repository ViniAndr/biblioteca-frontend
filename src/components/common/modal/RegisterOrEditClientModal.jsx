// Hooks e componentes
import useForm from "../../../hooks/useForm";
import Button from "../Button";
import Form from "../../forms/Form";

// Validações
import { validateString, validatePhone, validateRequiredField, validateHouseNumber } from "../../../utils/validations";

const RegisterOrEditClientModal = ({ onClose, onConfirm, initialData }) => {
  const { values, errors, handleChange, validateAll } = useForm(
    {
      nome: initialData?.nome || "",
      sobrenome: initialData?.sobrenome || "",
      telefone: initialData?.telefone || "",
      logradouro: initialData?.logradouro || "",
      numero: initialData?.numero || "",
      bairro: initialData?.bairro || "",
      cidade: initialData?.cidade || "",
      estado: initialData?.estado || "",
      cep: initialData?.cep || "",
    },
    {
      nome: validateString,
      sobrenome: validateString,
      telefone: validatePhone,
      logradouro: validateRequiredField,
      numero: validateHouseNumber,
      bairro: validateRequiredField,
      cidade: validateString,
      estado: validateRequiredField,
      cep: validateRequiredField,
    },
  );

  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  // MÁSCARA DE TELEFONE: Formata para (99) 99999-9999 enquanto o usuário digita
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Tira tudo que não for número
    value = value.substring(0, 11); // Limita a 11 dígitos no máximo

    let formatted = value;
    if (value.length > 2) {
      formatted = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 7) {
      formatted = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    }

    // Devolve o valor formatado para o handleChange original do seu hook
    e.target.value = formatted;
    handleChange(e);
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;
    if (onConfirm) {
      await onConfirm(values);
      onClose();
    }
  };

  // Desenho do formulário. O componente Form vai renderizar tudo!
  const formGroups = [
    {
      layout: "grid-2", // Fica lado a lado
      fields: [
        {
          component: "input",
          name: "nome",
          label: "Nome",
          value: values.nome,
          onChange: handleChange,
          error: errors.nome,
        },
        {
          component: "input",
          name: "sobrenome",
          label: "Sobrenome",
          value: values.sobrenome,
          onChange: handleChange,
          error: errors.sobrenome,
        },
        {
          component: "input",
          name: "telefone",
          label: "Telefone",
          value: values.telefone,
          onChange: handlePhoneChange,
          error: errors.telefone,
          placeholder: "(99) 99999-9999",
        },
        { component: "input", name: "cep", label: "CEP", value: values.cep, onChange: handleChange, error: errors.cep },
      ],
    },
    {
      layout: "grid-3", // Fica 3 colunas
      fields: [
        {
          component: "input",
          name: "logradouro",
          label: "Logradouro",
          value: values.logradouro,
          onChange: handleChange,
          error: errors.logradouro,
        },
        {
          component: "input",
          name: "numero",
          label: "Número",
          value: values.numero,
          onChange: handleChange,
          error: errors.numero,
        },
        {
          component: "input",
          name: "bairro",
          label: "Bairro",
          value: values.bairro,
          onChange: handleChange,
          error: errors.bairro,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "cidade",
          label: "Cidade",
          value: values.cidade,
          onChange: handleChange,
          error: errors.cidade,
        },
        {
          component: "select",
          name: "estado",
          label: "Estado (UF)",
          value: values.estado,
          onChange: (opcaoSelecionada) => {
            // Se o select estiver mandando o objeto, pegamos o .value ou .id. Se for só texto, pegamos ele mesmo.
            const valor = opcaoSelecionada?.value || opcaoSelecionada?.id || opcaoSelecionada;

            // Enviar para o hook exatamente no formato que ele quer:
            handleChange({
              target: {
                name: "estado",
                value: valor,
              },
            });
          },
          error: errors.estado,
          options: ufs.map((uf) => ({ id: uf, nome: uf, value: uf, label: uf })),
          defaultOptionLabel: "Selecione a UF (Estado)",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Form formGroups={formGroups} handleForm={handleSubmit} size="full" variant="modal" />

      <div className="flex justify-end gap-4">
        <Button variant="back" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </div>
    </div>
  );
};

export default RegisterOrEditClientModal;
