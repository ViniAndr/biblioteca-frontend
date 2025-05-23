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
    {
      name: validate.validateString,
      lastname: validate.validateString,
      email: validate.validateEmail,
      password: validate.validatePassword,
      phone: validate.validatePhone,
      street: validate.validateRequiredField,
      number: validate.validateHouseNumber,
      neighborhood: validate.validateRequiredField,
      city: validate.validateString,
      state: validate.validateRequiredField,
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

  const formGroups = [
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "name",
          label: "Nome",
          placeholder: "Digite seu nome",
          value: values.name,
          onChange: handleChange,
          error: errors.name,
        },
        {
          component: "input",
          name: "lastname",
          label: "Sobrenome",
          placeholder: "Digite seu sobrenome",
          value: values.lastname,
          onChange: handleChange,
          error: errors.lastname,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "email",
          label: "Email",
          placeholder: "Digite seu email",
          inputType: "email",
          value: values.email,
          onChange: handleChange,
          error: errors.email,
        },
        {
          component: "input",
          name: "phone",
          label: "Telefone",
          placeholder: "Digite seu telefone",
          inputType: "text",
          value: values.phone,
          onChange: handleChange,
          error: errors.phone,
        },
      ],
    },
    {
      layout: "vertical",
      fields: [
        {
          component: "input",
          name: "password",
          label: "Senha",
          placeholder: "Digite sua senha",
          inputType: "password",
          value: values.password,
          onChange: handleChange,
          error: errors.password,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "cep",
          label: "CEP",
          placeholder: "Digite seu CEP",
          value: values.cep,
          onChange: handleChange,
          error: errors.cep,
          handleCepSearch,
          loadingCep,
        },
        {
          component: "input",
          name: "street",
          label: "Endereço",
          placeholder: "Rua, avenida, etc",
          value: values.street,
          onChange: handleChange,
          error: errors.street,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "number",
          label: "Número",
          placeholder: "123",
          value: values.number,
          onChange: handleChange,
          error: errors.number,
        },
        {
          component: "input",
          name: "neighborhood",
          label: "Bairro",
          placeholder: "Centro, Bairro Alto...",
          value: values.neighborhood,
          onChange: handleChange,
          error: errors.neighborhood,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "city",
          label: "Cidade",
          placeholder: "São Paulo, Salvador...",
          value: values.city,
          onChange: handleChange,
          error: errors.city,
        },
        {
          component: "select",
          name: "state",
          label: "Estado",
          options: ufs,
          value: values.state,
          onChange: handleChange,
          error: errors.state,
          placeholder: "Selecione um Estado",
        },
      ],
    },
  ];

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return; // Se houver erro, não envia
    setLoading(true);

    try {
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
    <Form
      formStructure={{
        title: "Cadastrar",
        description: "Realize seu cadastro como cliente abaixo:",
      }}
      formGroups={formGroups}
      handleForm={handleSubmit}
      loading={loading}
      buttonText="Criar Conta"
      size="xl"
    />
  );
};

export default Register;
