import { useEffect } from "react";

const Alerta = ({ mensagem, tipo, aoFechar }) => {
  const estilosAlerta = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    attention: "bg-orange-100 border-orange-400 text-orange-700",
  };

  const duracao = 3000;

  useEffect(() => {
    const temporizador = setTimeout(() => {
      aoFechar();
    }, duracao);

    return () => clearTimeout(temporizador); // Limpa o timeout se o componente for desmontado antes do tempo expirar
  }, [aoFechar, duracao]);

  return (
    <div
      className={`fixed z-50 inset-x-0 top-28 mx-auto max-w-xl w-full p-4 border-l-4 rounded shadow-lg ${estilosAlerta[tipo]} flex justify-between items-center`}
    >
      <span>{mensagem}</span>
      <button onClick={aoFechar} className="text-lg font-bold p-2">
        &times;
      </button>
    </div>
  );
};

export default Alerta;
