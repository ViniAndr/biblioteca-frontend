import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Contextos
import { useAutenticacao } from "../../contexts/AutenticacaoContext";
import { useAlerta } from "../../contexts/AlertaContext";

// Hooks e componentes
import useFormulario from "../../hooks/useFormulario";
import Formulario from "../../components/forms/Formulario";

// Validações e serviços
import { validarEmail, validarSenha } from "../../utils/validacoes";
import { fazerLoginUsuario } from "../../services/authService";

const LoginFuncionarioEAdmin = () => {
  const { mostrarAlerta } = useAlerta();
  const navigate = useNavigate();
  const { login } = useAutenticacao();
  const [carregando, setCarregando] = useState(false);

  // Hook personalizado de formulário (com validação)
  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
    {
      email: "",
      senha: "",
      tipoLogin: "funcionario", // Padrão: funcionário
    },
    {
      email: validarEmail,
      senha: validarSenha,
    },
  );

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarTudo()) return;

    setCarregando(true);
    try {
      const response = await fazerLoginUsuario(valores.email, valores.senha, login, valores.tipoLogin);
      if (!response.error) {
        mostrarAlerta(response.message, "success");
        navigate("/");
      } else {
        mostrarAlerta(response.message, "attention");
      }
    } catch {
      mostrarAlerta("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setCarregando(false);
    }
  };

  // Grupos de campos para o novo sistema de Form
  const gruposDeCampos = [
    {
      layout: "vertical",
      fields: [
        {
          component: "input",
          name: "email",
          label: "Email",
          placeholder: "Digite seu email",
          inputType: "email",
          value: valores.email,
          onChange: lidarComMudanca,
          error: erros.email,
        },
        {
          component: "input",
          name: "senha",
          label: "Senha",
          placeholder: "Digite sua senha",
          inputType: "password",
          value: valores.senha,
          onChange: lidarComMudanca,
          error: erros.senha,
        },
      ],
    },
    {
      layout: "vertical",
      fields: [
        {
          component: "radio", // componente do tipo rádio
          name: "tipoLogin",
          title: "Tipo de Login",
          options: [
            { label: "Funcionário", value: "funcionario" },
            { label: "Administrador", value: "admin" },
          ],
          selectedValue: valores.tipoLogin,
          onChange: lidarComMudanca,
        },
      ],
    },
  ];

  return (
    <Formulario
      estruturaFormulario={{
        title: "Área Restrita",
        description: "Login para Funcionário e Administradores",
      }}
      gruposDeCampos={gruposDeCampos}
      aoEnviar={handleSubmit}
      carregando={carregando}
      textoBotao="Entrar"
    />
  );
};

export default LoginFuncionarioEAdmin;
