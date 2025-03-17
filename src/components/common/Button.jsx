import { useNavigate } from "react-router-dom";

const Button = ({ text, to, size, variant, rounded }) => {
  const navigate = useNavigate();

  const sizes = {
    full: "w-full py-2 px-4 text-base",
    md: "w-auto py-2 px-3 text-base",
    sm: "w-auto py-1 px-2 text-sm",
  };

  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600", // Botão azul
    cancel: "bg-red-500 hover:bg-red-600", // Botão de cancelar (vermelho)
    back: "bg-gray-500 hover:bg-gray-600", // Botão de voltar (cinza)
  };

  // Definindo as classes base
  const baseClass = `text-white text-center font-bold rounded cursor-pointer transition duration-300 ease-in-out 
  ${sizes[size] || sizes.md} 
  ${variant ? variants[variant] : variants.primary}
  ${rounded ? "rounded-3xl" : ""}`;

  function handleClick() {
    if (to) {
      navigate(to);
    }
  }

  return (
    <button className={baseClass} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
