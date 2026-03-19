// Hooks e componentes
import useFormulario from "../../../hooks/useFormulario";
import Botao from "../Botao";
import Formulario from "../../forms/Formulario";

// Validações
import {
  validarTexto,
  validarTelefone,
  validarCampoObrigatorio,
  validarNumeroCasa,
  validarEmail,
} from "../../../utils/validacoes";

const ModalCadastrarOuEditarCliente = ({ aoFechar, aoConfirmar, dadosIniciais }) => {
  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
    {
      nome: dadosIniciais?.nome || "",
      sobrenome: dadosIniciais?.sobrenome || "",
      telefone: dadosIniciais?.telefone || "",
      email: dadosIniciais?.email || "",
      logradouro: dadosIniciais?.logradouro || "",
      numero: dadosIniciais?.numero || "",
      bairro: dadosIniciais?.bairro || "",
      cidade: dadosIniciais?.cidade || "",
      estado: dadosIniciais?.estado || "",
      cep: dadosIniciais?.cep || "",
    },
    {
      nome: validarTexto,
      sobrenome: validarTexto,
      telefone: validarTelefone,
      email: dadosIniciais?.email ? validarEmail : () => null,
      logradouro: validarCampoObrigatorio,
      numero: validarNumeroCasa,
      bairro: validarCampoObrigatorio,
      cidade: validarTexto,
      estado: validarCampoObrigatorio,
      cep: validarCampoObrigatorio,
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

  // MÁSCARA DE TELEFONE: Formata para (99) 99999-9999 enquanto o usuário digita
  const lidarComMudancaTelefone = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Tira tudo que não for número
    valor = valor.substring(0, 11); // Limita a 11 dígitos no máximo

    let formatado = valor;
    if (valor.length > 2) {
      formatado = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    }
    if (valor.length > 7) {
      formatado = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
    }

    // Devolve o valor formatado para o handleChange original do seu hook
    e.target.value = formatado;
    lidarComMudanca(e);
  };

  const lidarComEnvio = async () => {
    if (!validarTudo()) return;
    if (aoConfirmar) {
      await aoConfirmar(valores);
      aoFechar();
    }
  };

  // Desenho do formulário. O componente Formulario vai renderizar tudo!
  const gruposDeCampos = [
    {
      layout: "grid-2", // Fica lado a lado
      fields: [
        {
          component: "input",
          name: "nome",
          label: "Nome",
          value: valores.nome,
          onChange: lidarComMudanca,
          error: erros.nome,
        },
        {
          component: "input",
          name: "sobrenome",
          label: "Sobrenome",
          value: valores.sobrenome,
          onChange: lidarComMudanca,
          error: erros.sobrenome,
        },
        {
          component: "input",
          name: "telefone",
          label: "Telefone",
          value: valores.telefone,
          onChange: lidarComMudancaTelefone,
          error: erros.telefone,
          placeholder: "(99) 99999-9999",
        },

        // --- CAMPO CONDICIONAL DE EMAIL ---
        // Se o dadosIniciais tiver email (Cliente Online), renderiza o campo de email aqui.
        ...(dadosIniciais?.email
          ? [
              {
                component: "input",
                type: "email",
                name: "email",
                label: "E-mail",
                value: valores.email,
                onChange: lidarComMudanca,
                error: erros.email,
              },
            ]
          : []),

        {
          component: "input",
          name: "cep",
          label: "CEP",
          value: valores.cep,
          onChange: lidarComMudanca,
          error: erros.cep,
        },
      ],
    },
    {
      layout: "grid-3", // Fica 3 colunas
      fields: [
        {
          component: "input",
          name: "logradouro",
          label: "Logradouro",
          value: valores.logradouro,
          onChange: lidarComMudanca,
          error: erros.logradouro,
        },
        {
          component: "input",
          name: "numero",
          label: "Número",
          value: valores.numero,
          onChange: lidarComMudanca,
          error: erros.numero,
        },
        {
          component: "input",
          name: "bairro",
          label: "Bairro",
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
          value: valores.cidade,
          onChange: lidarComMudanca,
          error: erros.cidade,
        },
        {
          component: "select",
          name: "estado",
          label: "Estado (UF)",
          value: valores.estado,
          onChange: (opcaoSelecionada) => {
            // Se o select estiver mandando o objeto, pegamos o .value ou .id. Se for só texto, pegamos ele mesmo.
            const valorSelecionado = opcaoSelecionada?.value || opcaoSelecionada?.id || opcaoSelecionada;

            // Enviar para o hook exatamente no formato que ele quer:
            lidarComMudanca({
              target: {
                name: "estado",
                value: valorSelecionado,
              },
            });
          },
          error: erros.estado,
          options: ufs.map((uf) => ({ id: uf, nome: uf, value: uf, label: uf })),
          textoPadraoOpcao: "Selecione a UF (Estado)",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Formulario gruposDeCampos={gruposDeCampos} aoEnviar={lidarComEnvio} tamanho="full" variante="modal" />

      <div className="flex justify-end gap-4">
        <Botao variante="back" onClick={aoFechar}>
          Cancelar
        </Botao>
        <Botao onClick={lidarComEnvio}>Salvar</Botao>
      </div>
    </div>
  );
};

export default ModalCadastrarOuEditarCliente;
