import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import { useAutenticacao } from "../../contexts/AutenticacaoContext";
import { useAlerta } from "../../contexts/AlertaContext";

// Hooks e Components
import useFormulario from "../../hooks/useFormulario";
import Formulario from "../../components/forms/Formulario";

// Utils e Services
import { validarEmail, validarSenha } from "../../utils/validacoes";
import { fazerLoginUsuario } from "../../services/authService";

const LoginCliente = () => {
  const { mostrarAlerta } = useAlerta();
  const navigate = useNavigate();
  const { login } = useAutenticacao();
  const [carregando, setCarregando] = useState(false);

  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
    { email: "", senha: "" }, // Mantive "senha" porque agora vai casar com o name do input abaixo
    { email: validarEmail, senha: validarSenha },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarTudo()) return;

    setCarregando(true);
    try {
      const response = await fazerLoginUsuario(valores.email, valores.senha, login);
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
  ];

  return (
    <Formulario
      estruturaFormulario={{
        title: "Entrar",
        description: "Preencha os campos abaixo para poder entrar na sua conta",
      }}
      gruposDeCampos={gruposDeCampos}
      aoEnviar={handleSubmit}
      carregando={carregando}
      textoBotao="Entrar"
    >
      <hr className="my-2 opacity-30" />
      <p className="text-zinc-500 text-sm">
        Deseja transformar sua conta presencial em online?{" "}
        <Link to="/migrar-conta" className="text-blue-700">
          clique aqui
        </Link>
      </p>
    </Formulario>
  );
};

export default LoginCliente;
