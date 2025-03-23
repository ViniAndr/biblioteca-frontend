import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Hooks
import useForm from "../../hooks/useForm"; // Hook personalizado

// Components
import Form from "../../components/forms/Form";

// utils e Service
import { validateEmail, validatePassword } from "../../utils/validations";
import { ClientLogin as loginApi } from "../../services/auth";

const ClientLogin = () => {
  const { showAlert } = useAlert();
  const navegate = useNavigate();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Hook de gerenciamento de formulário
  const { values, errors, handleChange, validateAll } = useForm(
    { email: "", password: "" },
    { email: validateEmail, password: validatePassword }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return; // Se houver erro, não envia
    setLoading(true);

    try {
      const response = await loginApi(values.email, values.password, login);
      if (!response.error) {
        showAlert(response.message, "success");
        navegate("/");
      } else {
        showAlert(response.message, "attention");
      }
    } catch (error) {
      showAlert("Erro inesperado. Por favor, tente novamente.", "error");
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
      value: values.email,
      onChange: handleChange,
      error: errors.email,
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
  ];
  return (
    <Form
      formStructure={{
        title: "Entrar",
        description: "Preencha os campos abaixo para poder entrar na sua conta",
      }}
      inputData={inputData}
      handleForm={handleSubmit}
      loading={loading}
      buttonText="Entrar"
    >
      <hr className="my-2 opacity-30" />
      <p className="text-zinc-500 text-sm">
        Ainda não tem uma conta?{" "}
        <Link to="/migrar-conta" className="text-blue-700">
          clique aqui
        </Link>
      </p>
    </Form>
  );
};

export default ClientLogin;
