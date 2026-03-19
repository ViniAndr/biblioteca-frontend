import { useState } from "react";

//context
import { useAutenticacao } from "../../contexts/AutenticacaoContext";
import { useAlerta } from "../../contexts/AlertaContext";

// Components
import Formulario from "../../components/forms/Formulario";
import useFormulario from "../../hooks/useFormulario";

// Utils e Services
import * as validacoes from "../../utils/validacoes";
import { criarContaOnlineCliente } from "../../services/authService";

const Cadastro = () => {
  const { mostrarAlerta } = useAlerta();
  const { login } = useAutenticacao();
  const [carregando, setCarregando] = useState(false);

  const { valores, erros, lidarComMudanca, buscarCep, carregandoCep, validarTudo } = useFormulario(
    {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      telefone: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    {
      nome: validacoes.validarTexto,
      sobrenome: validacoes.validarTexto,
      email: validacoes.validarEmail,
      senha: validacoes.validarSenha,
      telefone: validacoes.validarTelefone,
      logradouro: validacoes.validarCampoObrigatorio,
      numero: validacoes.validarNumeroCasa,
      bairro: validacoes.validarCampoObrigatorio,
      cidade: validacoes.validarTexto,
      estado: validacoes.validarCampoObrigatorio,
      cep: validacoes.validarCampoObrigatorio,
    },
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

  const gruposDeCampos = [
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "nome",
          label: "Nome",
          placeholder: "Digite seu nome",
          value: valores.nome,
          onChange: lidarComMudanca,
          error: erros.nome,
        },
        {
          component: "input",
          name: "sobrenome",
          label: "Sobrenome",
          placeholder: "Digite seu sobrenome",
          value: valores.sobrenome,
          onChange: lidarComMudanca,
          error: erros.sobrenome,
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
          value: valores.email,
          onChange: lidarComMudanca,
          error: erros.email,
        },
        {
          component: "input",
          name: "telefone",
          label: "Telefone",
          placeholder: "Digite seu telefone",
          inputType: "text",
          value: valores.telefone,
          onChange: lidarComMudanca,
          error: erros.telefone,
        },
      ],
    },
    {
      layout: "vertical",
      fields: [
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
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "cep",
          label: "CEP",
          placeholder: "Digite seu CEP",
          value: valores.cep,
          onChange: lidarComMudanca,
          error: erros.cep,
          buscarCep: buscarCep,
          carregandoCep: carregandoCep,
        },
        {
          component: "input",
          name: "logradouro",
          label: "Endereço",
          placeholder: "Rua, avenida, etc",
          value: valores.logradouro,
          onChange: lidarComMudanca,
          error: erros.logradouro,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "numero",
          label: "Número",
          placeholder: "123",
          value: valores.numero,
          onChange: lidarComMudanca,
          error: erros.numero,
        },
        {
          component: "input",
          name: "bairro",
          label: "Bairro",
          placeholder: "Centro, Bairro Alto...",
          value: valores.bairro,
          onChange: lidarComMudanca,
          error: erros.bairro,
        },
      ],
    },
    {
      layout: "grid-2",
      fields: [
        {
          component: "input",
          name: "cidade",
          label: "Cidade",
          placeholder: "São Paulo, Salvador...",
          value: valores.cidade,
          onChange: lidarComMudanca,
          error: erros.cidade,
        },
        {
          component: "select",
          name: "estado",
          label: "Estado",
          options: ufs,
          value: valores.estado,
          onChange: (valorSelecionado) => {
            lidarComMudanca({
              target: {
                name: "estado",
                value: valorSelecionado,
              },
            });
          },
          error: erros.estado,
          placeholder: "Selecione um Estado",
        },
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarTudo()) return;
    setCarregando(true);

    try {
      const response = await criarContaOnlineCliente(valores, login);
      if (response?.error) {
        mostrarAlerta(response.message, "error");
      } else {
        mostrarAlerta(response.message, "success");
      }
    } catch {
      mostrarAlerta("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setCarregando(false);
    }
  };
  return (
    <Formulario
      estruturaFormulario={{
        title: "Cadastrar",
        description: "Realize seu cadastro como cliente abaixo:",
      }}
      gruposDeCampos={gruposDeCampos}
      aoEnviar={handleSubmit}
      carregando={carregando}
      textoBotao="Criar Conta"
      tamanho="xl"
    />
  );
};

export default Cadastro;
