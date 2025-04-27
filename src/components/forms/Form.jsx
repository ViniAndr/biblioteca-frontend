import { useState } from "react";

// Components
import Button from "../common/Button";
import ShowPasswordToggle from "./ShowPasswordToggle";
import Input from "./Input";
import Select from "./Select";
import InputRadio from "./InputRadiu";

const Form = ({ formStructure, inputData, handleForm, loading, buttonText, children }) => {
  const [passwordType, setPasswordType] = useState("password");

  // Design personalizado para diferentes quantidades de input e responsividade.
  const designBaseForm = inputData.length < 6 ? "flex flex-col gap-3" : "grid grid-cols-1 gap-3 md:grid-cols-2";
  const widthForm = inputData.length < 6 ? "max-w-96" : "max-w-xl";

  return (
    <div className={`${widthForm} m-auto my-8 md:my-16 rounded-lg border border-zinc-50 shadow p-8`}>
      {/* Cabeçario do form */}
      <div className="flex flex-col space-y-1.5 mb-4">
        <h1 className="font-bold text-3xl">{formStructure.title}</h1>
        <p className="text-zinc-500">{formStructure.description}</p>
      </div>

      {/* Formulario com os Inputs */}
      <form onSubmit={handleForm}>
        <div className={`${designBaseForm} mb-3`}>
          {inputData?.map((data, index) => {
            if (data.placeholder) {
              // Se o item tem a propriedade 'placeholder', renderiza o Input
              return (
                <div className={`${data.handleCepSearch ? "flex items-end gap-2" : ""}`} key={index}>
                  <Input id={data.name} {...data} type={data.name === "password" ? passwordType : data.type} />
                  {/* Se o input for de senha, adiciona o mostrar senha */}
                  {data.name === "password" && (
                    <ShowPasswordToggle onToggle={(show) => setPasswordType(show ? "text" : "password")} />
                  )}
                  {/* Se o input for de CEP, adicionar o botão para consultar uma API Externa */}
                  {data.handleCepSearch && (
                    <div className="min-w-29">
                      <Button onClick={data.handleCepSearch} variant="back" size="full" disabled={data.loadingCep}>
                        {data.loadingCep ? "Buscando..." : "Buscar CEP"}
                      </Button>
                    </div>
                  )}
                </div>
              );
            } else if (data.options) {
              // Se o item tem a propriedade 'options', renderiza o InputRadio
              return <InputRadio key={index} {...data} />;
            } else {
              // Caso contrário, renderiza o Select
              return <Select key={index} id={data.name} {...data} />;
            }
          })}
        </div>

        <Button size="full" disabled={loading} type="submit">
          {loading ? "Processando..." : buttonText}
        </Button>
        {children && children}
      </form>
    </div>
  );
};

export default Form;
