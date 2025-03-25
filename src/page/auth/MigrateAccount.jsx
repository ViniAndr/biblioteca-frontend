import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useAlert } from "../../contexts/AlertContext";

// Hooks
import useForm from "../../hooks/useForm"; // Hook personalizado

// Components
import Form from "../../components/forms/Form";

// utils e Service
import { validateEmail, validatePassword, validatePhone } from "../../utils/validations";
import { handleMigrateAccount } from "../../services/auth";

const MigrateAccount = () => {
  const { showAlert } = useAlert();
  const navegate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Hook de gerenciamento de formulário
  const { values, errors, handleChange, validateAll } = useForm(
    { email: "", phone: "", password: "" },
    { email: validateEmail, phone: validatePhone, password: validatePassword }
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateAll()) return; // Se houver erro, não envia
    setLoading(true);

    try {
      const response = await handleMigrateAccount(values);
      if (!response.error) {
        showAlert(response.message, "success");
        navegate("/clientes/login");
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
  ];
  return (
    <Form
      formStructure={{
        title: "Migrar Conta",
        description: "Tem uma conta presencial e deseja usar o site, basta preencher com os dados abaixo:",
      }}
      inputData={inputData}
      handleForm={handleLogin}
      loading={loading}
      buttonText="Migrar"
    />
  );
};

export default MigrateAccount;
