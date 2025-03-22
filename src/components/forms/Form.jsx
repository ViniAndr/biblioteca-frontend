import { useState } from "react";

// Components
import Button from "../common/Button";
import ShowPasswordToggle from "./ShowPasswordToggle";
import Input from "./Input";

const Form = ({ formStructure, inputData, handleForm, loading, buttonText, children }) => {
  const [passwordType, setPasswordType] = useState("password");

  return (
    <div className="max-w-96 m-auto my-8 md:my-16 rounded-lg border border-zinc-50 shadow p-8">
      {/* Cabeçario do form */}
      <div className="flex flex-col space-y-1.5 mb-4">
        <h1 className="font-bold text-3xl">{formStructure.title}</h1>
        <p className="text-zinc-500">{formStructure.description}</p>
      </div>

      {/* Formulario com os Inputs */}
      <form className="flex flex-col gap-3" onSubmit={handleForm}>
        {inputData?.map((data, index) => (
          <div key={index}>
            <Input id={data.name} {...data} type={data.name === "password" ? passwordType : data.type} />
            {data.name === "password" && <ShowPasswordToggle onToggle={(show) => setPasswordType(show ? "text" : "password")} />}
          </div>
        ))}

        <Button size="full" disabled={loading}>
          {loading ? "Processando..." : buttonText}
        </Button>
        {children && children}
      </form>
    </div>
  );
};

export default Form;
