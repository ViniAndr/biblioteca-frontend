import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

// Hooks e Components
import useForm from "../../hooks/useForm";
import Form from "../../components/forms/Form";

// Utils e Services
import { validateEmail, validatePassword } from "../../utils/validations";
import { UserLogin } from "../../services/auth";

const ClientLogin = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const { values, errors, handleChange, validateAll } = useForm(
    { email: "", password: "" },
    { email: validateEmail, password: validatePassword }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      const response = await UserLogin(values.email, values.password, login);
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
  ];

  return (
    <Form
      formStructure={{
        title: "Entrar",
        description: "Preencha os campos abaixo para poder entrar na sua conta",
      }}
      formGroups={formGroups}
      handleForm={handleSubmit}
      loading={loading}
      buttonText="Entrar"
    >
      <hr className="my-2 opacity-30" />
      <p className="text-zinc-500 text-sm">
        Deseja transformar sua conta presencial em online?{" "}
        <Link to="/migrar-conta" className="text-blue-700">
          clique aqui
        </Link>
      </p>
    </Form>
  );
};

export default ClientLogin;
