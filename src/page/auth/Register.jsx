import { useState } from "react";

//context
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Components
import Form from "../../components/forms/Form";
import useForm from "../../hooks/useForm";

// Utils e Services
import * as validate from "../../utils/validations";
import { createOnlineCustomerAccount } from "../../services/auth";

const Register = () => {
  const { showAlert } = useAlert();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const validateForm = {
    name: validate.validateString,
    lastname: validate.validateString,
    email: validate.validateEmail,
    password: validate.validatePassword,
    phone: validate.validatePhone,
    address: validate.validateRequiredField,
    number: validate.validateHouseNumber,
    neighborhood: validate.validateRequiredField,
    city: validate.validateString,
    state: validate.validateRequiredField,
    cep: validate.validateRequiredField,
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
      options: ufs,
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
        showAlert(response.message, "success");
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
