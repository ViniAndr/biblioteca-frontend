import { useState } from "react";
import FormGroupRenderer from "./FormGroupRenderer";
import Button from "../common/Button";

const Form = ({ formStructure = null, formGroups, handleForm, loading, buttonText, size = "sm", children }) => {
  // Tamanhos permitidos para o formulário
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Estado que controla o tipo do campo de senha (password/text)
  const [passwordType, setPasswordType] = useState("password");

  // Alterna visibilidade da senha
  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={`${sizes[size]} m-auto my-8 md:my-16 rounded-lg border border-zinc-50 shadow p-8`}>
      {/* Cabeçalho opcional do formulário */}
      {formStructure && (
        <div className="flex flex-col space-y-1.5 mb-4">
          <h1 className="font-bold text-3xl">{formStructure.title}</h1>
          <p className="text-zinc-500">{formStructure.description}</p>
        </div>
      )}

      {/* Formulário com grupos de campos dinâmicos */}
      <form onSubmit={handleForm} className="flex flex-col gap-3">
        {formGroups.map((group, index) => (
          <FormGroupRenderer
            key={index}
            layout={group.layout} // Tipo de layout (vertical, grid-2, etc)
            fields={group.fields} // Campos desse grupo
            onPasswordToggle={togglePasswordVisibility} // Função de toggle para senha
            passwordType={passwordType} // Tipo atual do campo de senha
          />
        ))}

        {/* Botão de envio */}
        <Button size="full" disabled={loading} type="submit">
          {loading ? "Processando..." : buttonText}
        </Button>

        {/* Conteúdo adicional abaixo do botão */}
        {children && children}
      </form>
    </div>
  );
};

export default Form;
