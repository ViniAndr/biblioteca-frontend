import { useState } from "react";

// Components
import Button from "../common/Button";
import ShowPasswordToggle from "./ShowPasswordToggle";
import Input from "./Input";

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
          {inputData?.map((data, index) => (
            <div className={`${data.handleCepSearch ? "flex items-end gap-2" : ""}`} key={index}>
              <Input id={data.name} {...data} type={data.name === "password" ? passwordType : data.type} />
              {data.name === "password" && (
                <ShowPasswordToggle onToggle={(show) => setPasswordType(show ? "text" : "password")} />
              )}
              {data.handleCepSearch && (
                <div className="min-w-29">
                  <Button onClick={data.handleCepSearch} variant="back" size="full" disabled={data.loadingCep} type="button">
                    {data.loadingCep ? "Buscando..." : "Buscar CEP"}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button size="full" disabled={loading}>
          {loading ? "Processando..." : buttonText}
        </Button>
        {children && children}
      </form>
    </div>
  );
};

export default Form;
