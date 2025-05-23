import Input from "./Input";
import Select from "./Select";
import InputRadio from "./InputRadiu";
import Button from "../common/Button";
import ShowPasswordToggle from "./ShowPasswordToggle";

/**
 * Componente responsável por renderizar grupos de campos do formulário
 * com diferentes layouts e comportamentos dinâmicos.
 */
const FormGroupRenderer = ({ layout, fields, onPasswordToggle, passwordType }) => {
  // Define classes de layout conforme o tipo solicitado
  const layoutClasses = {
    vertical: "flex flex-col gap-3",
    horizontal: "flex gap-4 flex-wrap",
    "grid-2": "grid grid-cols-1 md:grid-cols-2 gap-4",
    "grid-3": "grid grid-cols-1 md:grid-cols-3 gap-4",
  };

  return (
    <div className={layoutClasses[layout] || layoutClasses.vertical}>
      {fields.map((field, idx) => {
        if (field.component === "input") {
          const isPasswordField = field.name === "password";
          return (
            <div key={idx} className={`${field.handleCepSearch ? "flex gap-2 relative" : ""}`}>
              {/* Campo de input com controle de tipo dinâmico */}
              <Input id={field.name} {...field} type={isPasswordField ? passwordType : field.inputType || "text"} />

              {/* Checkbox para mostrar/ocultar senha */}
              {isPasswordField && onPasswordToggle && <ShowPasswordToggle onToggle={onPasswordToggle} />}

              {/* Botão para busca de CEP, posicionado ao lado do input */}
              {field.handleCepSearch && (
                <div className="min-w-29">
                  <Button
                    onClick={field.handleCepSearch}
                    variant="back"
                    disabled={field.loadingCep}
                    className="absolute top-6 h-10"
                  >
                    {field.loadingCep ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
              )}
            </div>
          );
        }

        // Renderização de campo do tipo SELECT (dropdown)
        if (field.component === "select") {
          return <Select key={idx} id={field.name} {...field} />;
        }

        // Renderização de campo do tipo RADIO
        if (field.component === "radio") {
          return <InputRadio key={idx} {...field} />;
        }

        return null;
      })}
    </div>
  );
};

export default FormGroupRenderer;
