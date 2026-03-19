import { useState } from "react";
import RenderizadorGrupoCampos from "./RenderizadorGrupoCampos";
import Botao from "../common/Botao";

const Formulario = ({
  estruturaFormulario = null,
  gruposDeCampos,
  aoEnviar,
  carregando,
  textoBotao = null,
  tamanho = "sm",
  variante = "default",
  children,
}) => {
  // Tamanhos permitidos para o formulário
  const tamanhos = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-full",
  };

  // Estado que controla o tipo do campo de senha (password/text)
  const [tipoSenha, setTipoSenha] = useState("password");

  // Alterna visibilidade da senha
  const alternarVisibilidadeSenha = () => {
    setTipoSenha((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div
      className={`${tamanhos[tamanho]} ${
        variante !== "default" ? "" : "m-auto my-8 md:my-16 rounded-lg border border-zinc-50 shadow p-8"
      }`}
    >
      {/* Cabeçalho opcional do formulário */}
      {estruturaFormulario && (
        <div className="flex flex-col space-y-1.5 mb-4">
          <h1 className="font-bold text-3xl">{estruturaFormulario.title}</h1>
          <p className="text-zinc-500">{estruturaFormulario.description}</p>
        </div>
      )}

      {/* Formulário com grupos de campos dinâmicos */}
      <form onSubmit={aoEnviar} className="flex flex-col gap-3">
        {gruposDeCampos.map((grupo, index) => (
          <RenderizadorGrupoCampos
            key={index}
            layout={grupo.layout} // Tipo de layout (vertical, grid-2, etc)
            campos={grupo.fields} // Campos desse grupo
            aoAlternarSenha={alternarVisibilidadeSenha} // Função de toggle para senha
            tipoSenha={tipoSenha} // Tipo atual do campo de senha
          />
        ))}

        {/* Botão de envio */}
        {textoBotao && (
          <Botao tamanho="full" disabled={carregando} type="submit">
            {carregando ? "Processando..." : textoBotao}
          </Botao>
        )}

        {/* Conteúdo adicional abaixo do botão */}
        {children && children}
      </form>
    </div>
  );
};

export default Formulario;
