import useForm from "../../../hooks/useForm";
import { validateRequiredField } from "../../../utils/validations";
import Form from "../../forms/Form";
import Button from "../Button";

const CreateOrEditAttributeModal = ({ onClose, onConfirm }) => {
  const { values, errors, handleChange, validateAll } = useForm({ nome: "" }, { nome: validateRequiredField });

  const handleSubmit = async () => {
    if (!validateAll()) return;
    if (onConfirm) {
      await onConfirm(values);
      onClose();
    }
  };

  const formGroups = [
    {
      layout: "vertical",
      fields: [
        {
          component: "input",
          name: "nome",
          label: "Nome",
          placeholder: "Digite o nome",
          inputType: "text",
          value: values.nome,
          onChange: handleChange,
          error: errors.nome,
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

export default CreateOrEditAttributeModal;
