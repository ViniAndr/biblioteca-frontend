// Hooks e componentes
import useForm from "../../../hooks/useForm";
import Input from "../../forms/Input";
import Button from "../Button";

// Validações
import * as validate from "../../../utils/validations";

const RegisterOrEditClientModal = ({ onClose, onConfirm }) => {
  const { values, errors, handleChange, validateAll } = useForm(
    {
      nome: "",
      sobrenome: "",
      telefone: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    {
      nome: validate.validateString,
      sobrenome: validate.validateString,
      telefone: validate.validatePhone,
      logradouro: validate.validateRequiredField,
      numero: validate.validateHouseNumber,
      bairro: validate.validateRequiredField,
      cidade: validate.validateString,
      estado: validate.validateRequiredField,
      cep: validate.validateRequiredField,
    }
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

  const handleSubmit = async () => {
    if (!validateAll()) return;
    if (onConfirm) {
      await onConfirm(values);
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Input
        id="nome"
        name="nome"
        label="Nome"
        placeholder="Digite o nome"
        value={values.nome}
        onChange={handleChange}
        error={errors.nome}
        autoFocus
      />

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
