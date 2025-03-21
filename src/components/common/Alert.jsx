import { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };

  const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Limpa o timeout se o componente for desmontado antes do tempo expirar
  }, [onClose, duration]);

  return (
    <div
      className={`fixed z-50 inset-x-0 top-28 mx-auto max-w-xl w-full p-4 border-l-4 rounded shadow-lg ${alertStyles[type]} flex justify-between items-center`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-lg font-bold p-2">
        &times;
      </button>
    </div>
  );
};

export default Alert;
