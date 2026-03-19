import { useState } from "react";

const AlternadorSenha = ({ aoAlternar }) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const lidarComAlternancia = () => {
    setMostrarSenha((prev) => {
      return !prev;
    });

    aoAlternar(!mostrarSenha);
  };

  return (
    <div className="mt-2">
      <input type="checkbox" id="mostrarSenha" name="mostrarSenha" checked={mostrarSenha} onChange={lidarComAlternancia} />
      <label className="ml-1 text-zinc-500" htmlFor="mostrarSenha">
        Mostrar senha
      </label>
    </div>
  );
};

export default AlternadorSenha;