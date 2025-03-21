import { useState } from "react";

// Context
import { useAuth } from "../../contexts/AuthContext";

// Hooks
import useForm from "../../hooks/useForm"; // Hook personalizado

// Components
import Form from "../../components/forms/Form";

// utils e Service
import { validateEmail, validatePassword } from "../../utils/validations";
import { ClientLogin as loginApi } from "../../services/auth";

const ClientLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Hook de gerenciamento de formulário
  const { values, errors, handleChange, validateAll } = useForm(
    { email: "", password: "" },
    { email: validateEmail, password: validatePassword }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateAll()) return; // Se houver erro, não envia

    try {
      const response = await loginApi(values.email, values.password, login);
      if (!response.error) {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log("Erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputData = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu email",
      required: true,
      value: values.email,
      onChange: handleChange,
      error: errors.email,
    },
    {
      label: "Senha",
      name: "password",
      type: "password",
      placeholder: "Digite sua senha",
      required: true,
      value: values.password,
      onChange: handleChange,
      error: errors.password,
    },
  ];
  return (
    <Form
      formStructure={{
        title: "Entrar",
        description: "Preencha os campos abaixo para poder entrar na sua conta",
      }}
      inputData={inputData}
      handleForm={handleLogin}
      loading={loading}
      buttonText="Entrar"
    />
  );
};

export default ClientLogin;
