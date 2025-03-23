import { useState } from "react";

//context
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Components
import Form from "../../components/forms/Form";
import useForm from "../../hooks/useForm";

// Utils e Services
import { validateEmail, validatePassword, validatePhone, validateRequiredField } from "../../utils/validations";
import { createOnlineCustomerAccount } from "../../services/auth";

const Register = () => {
  const { showAlert } = useAlert();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const validateForm = {
    name: validateRequiredField,
    lastname: validateRequiredField,
    email: validateEmail,
    password: validatePassword,
    phone: validatePhone,
    street: validateRequiredField,
    number: validateRequiredField,
    neighborhood: validateRequiredField,
    city: validateRequiredField,
    state: validateRequiredField,
    cep: validateRequiredField,
  };

  const { values, errors, handleChange, handleCepSearch, loadingCep, validateAll } = useForm(
    {
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
    },
    { ...validateForm }
  );

  const inputData = [
    {
      label: "Nome",
      name: "name",
      placeholder: "Digite seu nome",
      value: values.name,
      onChange: handleChange,
      error: errors.name,
    },
    {
      label: "Sobrenome",
      name: "lastname",
      placeholder: "Digite sua sobrenome",
      value: values.lastname,
      onChange: handleChange,
      error: errors.lastname,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu email",
      value: values.email,
      onChange: handleChange,
      error: errors.email,
    },
    {
      label: "Telefone",
      name: "phone",
      type: "text",
      placeholder: "Digite sua telefone",
      value: values.phone,
      onChange: handleChange,
      error: errors.phone,
    },
    {
      label: "Senha",
      name: "password",
      type: "password",
      placeholder: "Digite sua senha",
      value: values.password,
      onChange: handleChange,
      error: errors.password,
    },
    {
      label: "Endereço",
      name: "street",
      placeholder: "Digite seu endereço",
      value: values.street,
      onChange: handleChange,
      error: errors.street,
    },
    {
      label: "Número da Casa",
      name: "number",
      placeholder: "Digite o numero da casa",
      maxlength: "10",
      value: values.number,
      onChange: handleChange,
      error: errors.number,
    },
    {
      label: "Bairro",
      name: "neighborhood",
      placeholder: "Digite seu bairro",
      value: values.neighborhood,
      onChange: handleChange,
      error: errors.neighborhood,
    },
    {
      label: "Cidade",
      name: "city",
      placeholder: "Digite sua cidade",
      value: values.city,
      onChange: handleChange,
      error: errors.city,
    },
    {
      label: "Estado",
      name: "state",
      placeholder: "Digite seu estado",
      value: values.state,
      onChange: handleChange,
      error: errors.state,
    },
    {
      label: "CEP",
      name: "cep",
      placeholder: "Digite seu CEP",
      value: values.cep,
      onChange: handleChange,
      error: errors.cep,
      handleCepSearch,
      loadingCep,
    },
  ];

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return; // Se houver erro, não envia
    setLoading(true);

    try {
      console.log("try");
      const response = await createOnlineCustomerAccount(values, login);
      if (response?.error) {
        showAlert(response.message, "error");
      } else {
        showAlert("Conta criada com sucesso!", "success");
      }
    } catch {
      showAlert("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form
        formStructure={{
          title: "Cadastrar",
          description: "Realize seu cadastro como cliente abaxio:",
        }}
        inputData={inputData}
        handleForm={handleSubmit}
        loading={loading}
        buttonText="Criar Conta"
      />
    </>
  );
};

export default Register;
