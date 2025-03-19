import { useNavigate } from "react-router-dom";

const Button = ({ to, size = "md", variant = "primary", rounded = "", onClick, className = "", children }) => {
  const navigate = useNavigate();

  const sizes = {
    full: "w-full py-2 px-4 text-base",
    md: "w-auto py-1 px-3 text-base",
    sm: "w-auto py-1 px-2 text-xs",
  };

  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold", // Botão azul
    cancel: "bg-red-500 hover:bg-red-600 text-white font-bold", // Botão de cancelar (vermelho)
    back: "bg-gray-500 hover:bg-gray-600 text-white font-bold", // Botão de voltar (cinza)
    ghost: "font-medium hover:bg-gray-200",
    outline: "border",
  };

  // Definindo as classes base
  const baseClass = `rounded cursor-pointer transition duration-300 ease-in-out 
    ${sizes[size]} 
    ${variants[variant]}
    ${rounded}
    ${className}
  `;

  function handleClick() {
    if (to) {
      navigate(to);
    }
  }

  return (
    <button className={baseClass} onClick={onClick || handleClick}>
      {children}
    </button>
  );
};

export default Button;
