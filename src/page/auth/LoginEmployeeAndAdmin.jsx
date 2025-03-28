import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Hooks
import useForm from "../../hooks/useForm"; // Hook personalizado

// Components
import Form from "../../components/forms/Form";

// utils e Service
import { validateEmail, validatePassword } from "../../utils/validations";
import { UserLogin } from "../../services/auth";

const LoginEmployeeAndAdmin = () => {
  const { showAlert } = useAlert();
  const navegate = useNavigate();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Hook de gerenciamento de formulário
  const { values, errors, handleChange, validateAll } = useForm(
    { email: "", password: "", loginType: "employee" },
    { email: validateEmail, password: validatePassword }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return; // Se houver erro, não envia
    setLoading(true);

    try {
      const response = await UserLogin(values.email, values.password, login, values.loginType);
      if (!response.error) {
        showAlert(response.message, "success");
        navegate("/");
      } else {
        showAlert(response.message, "attention");
      }
    } catch {
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
    {
      title: "Tipo de Login",
      name: "loginType", // Nome para o grupo de rádio
      options: [
        { label: "Funcionário", value: "employee" },
        { label: "Administrador", value: "admin" },
      ],
      selectedValue: values.loginType, // Use values.loginType
      onChange: handleChange, // Use handleChange do hook
    },
  ];

  return (
    <Form
      formStructure={{
        title: "Área Restrita",
        description: "Login para Funcionário e Administradores",
      }}
      inputData={inputData}
      handleForm={handleSubmit}
      loading={loading}
      buttonText="Entrar"
    />
  );
};

export default LoginEmployeeAndAdmin;
