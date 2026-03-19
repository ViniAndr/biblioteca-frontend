import useFormulario from "../../../hooks/useFormulario";  
import { validarCampoObrigatorio } from "../../../utils/validacoes";  
import Formulario from "../../forms/Formulario";  
import Botao from "../Botao";  

const ModalCriarOuEditarAtributo = ({ aoFechar, aoConfirmar, dadosIniciais }) => {
  const { valores, erros, lidarComMudanca, validarTudo } = useFormulario(
    { nome: dadosIniciais?.nome || "" },
    { nome: validarCampoObrigatorio },
  );

  const lidarComEnvio = async () => {
    if (!validarTudo()) return;
    if (aoConfirmar) {
      await aoConfirmar(valores);
      aoFechar();
    }
  };

  const gruposDeCampos = [
    {
      layout: "vertical",
      fields: [ // Mantido fields internamente porque renderizadorGruposCampos espera
        {
          component: "input",
          name: "nome",
          label: "Nome",
          placeholder: "Digite o nome",
          type: "text",
          value: valores.nome,
          onChange: lidarComMudanca,
          error: erros.nome,
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

export default ModalCriarOuEditarAtributo;