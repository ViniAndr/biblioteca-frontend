import Input from "./Input";
import Select from "./Select";
import InputRadio from "./InputRadio";
import Botao from "../common/Botao";
import AlternadorSenha from "./AlternadorSenha";

/**
 * Componente responsável por renderizar grupos de campos do formulário
 * com diferentes layouts e comportamentos dinâmicos.
 */
const RenderizadorGrupoCampos = ({ layout, campos, aoAlternarSenha, tipoSenha }) => {
  // Define classes de layout conforme o tipo solicitado
  const classesDeLayout = {
    vertical: "flex flex-col gap-3",
    horizontal: "flex gap-4 flex-wrap",
    "grid-2": "grid grid-cols-1 md:grid-cols-2 gap-4",
    "grid-3": "grid grid-cols-1 md:grid-cols-3 gap-4",
  };

  return (
    <div className={classesDeLayout[layout] || classesDeLayout.vertical}>
      {campos.map((campo, idx) => {
        if (campo.component === "input") {
          const ehCampoDeSenha = campo.name === "password" || campo.name === "senha";
          return (
            <div key={idx} className={`${campo.buscarCep ? "flex gap-2 relative" : ""}`}>
              {/* Campo de input com controle de tipo dinâmico */}
              <Input id={campo.name} {...campo} type={ehCampoDeSenha ? tipoSenha : campo.inputType || "text"} />

              {/* Checkbox para mostrar/ocultar senha */}
              {ehCampoDeSenha && aoAlternarSenha && <AlternadorSenha aoAlternar={aoAlternarSenha} />}

              {/* Botão para busca de CEP, posicionado ao lado do input */}
              {campo.buscarCep && (
                <div className="min-w-29">
                  <Botao
                    onClick={campo.buscarCep}
                    variante="back"
                    disabled={campo.carregandoCep}
                    className="absolute top-6 h-10"
                  >
                    {campo.carregandoCep ? "Buscando..." : "Buscar"}
                  </Botao>
                </div>
              )}
            </div>
          );
        }

        // Renderização de campo do tipo SELECT (dropdown)
        if (campo.component === "select") {
          return <Select key={idx} id={campo.name} {...campo} />;
        }

        // Renderização de campo do tipo RADIO
        if (campo.component === "radio") {
          return <InputRadio key={idx} {...campo} />;
        }

        return null;
      })}
    </div>
  );
};

export default RenderizadorGrupoCampos;
