import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Contextos
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Hooks e componentes
import useForm from "../../hooks/useForm";
import Form from "../../components/forms/Form";

// Validações e serviços
import { validateEmail, validatePassword } from "../../utils/validations";
import { UserLogin } from "../../services/auth";

const LoginEmployeeAndAdmin = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Hook personalizado de formulário (com validação)
  const { values, errors, handleChange, validateAll } = useForm(
    {
      email: "",
      password: "",
      loginType: "employee", // padrão: funcionário
    },
    {
      email: validateEmail,
      password: validatePassword,
    }
  );

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);
    try {
      const response = await UserLogin(values.email, values.password, login, values.loginType);
      if (!response.error) {
        showAlert(response.message, "success");
        navigate("/");
      } else {
        showAlert(response.message, "attention");
      }
    } catch {
      showAlert("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Grupos de campos para o novo sistema de Form
  const formGroups = [
    {
      layout: "vertical",
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
      layout: "vertical",
      fields: [
        {
          component: "radio", // componente do tipo rádio
          name: "loginType",
          title: "Tipo de Login",
          options: [
            { label: "Funcionário", value: "employee" },
            { label: "Administrador", value: "admin" },
          ],
          selectedValue: values.loginType,
          onChange: handleChange,
        },
      ],
    },
  ];

  return (
    <Form
      formStructure={{
        title: "Área Restrita",
        description: "Login para Funcionário e Administradores",
      }}
      formGroups={formGroups}
      handleForm={handleSubmit}
      loading={loading}
      buttonText="Entrar"
    />
  );
};

export default LoginEmployeeAndAdmin;
