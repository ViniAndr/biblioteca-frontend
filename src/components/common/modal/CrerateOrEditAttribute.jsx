import useForm from "../../../hooks/useForm";
import { validateRequiredField } from "../../../utils/validations";
import Input from "../../forms/Input";
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

export default CreateOrEditAttributeModal;
