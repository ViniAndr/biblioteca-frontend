import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useAlerta } from "../../contexts/AlertaContext";

// Hooks
import useFormulario from "../../hooks/useFormulario";

// Components
import Formulario from "../../components/forms/Formulario";

// utils e Service
import { validarEmail, validarSenha, validarTelefone } from "../../utils/validacoes";
import { migrarContaCliente } from "../../services/authService";

const MigrarConta = () => {
  const { mostrarAlerta } = useAlerta();
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(false);

  // Hook de gerenciamento de formulário
  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
    { email: "", telefone: "", senha: "" },
    { email: validarEmail, telefone: validarTelefone, senha: validarSenha },
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validarTudo()) return; // Se houver erro, não envia
    setCarregando(true);

    try {
      const response = await migrarContaCliente(valores);
      if (!response.error) {
        mostrarAlerta(response.message, "success");
        navigate("/clientes/login");
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
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu email",
      value: valores.email,
      onChange: lidarComMudanca,
      error: erros.email,
    },
    {
      label: "Telefone",
      name: "telefone",
      type: "text",
      placeholder: "Digite sua telefone",
      value: valores.telefone,
      onChange: lidarComMudanca,
      error: erros.telefone,
    },
    {
      label: "Senha",
      name: "senha",
      type: "password",
      placeholder: "Digite sua senha",
      value: valores.senha,
      onChange: lidarComMudanca,
      error: erros.senha,
    },
  ];
  return (
    <Formulario
      estruturaFormulario={{
        title: "Migrar Conta",
        description: "Tem uma conta presencial e deseja usar o site, basta preencher com os dados abaixo:",
      }}
      gruposDeCampos={gruposDeCampos}
      aoEnviar={handleLogin}
      carregando={carregando}
      textoBotao="Migrar"
    />
  );
};

export default MigrarConta;
