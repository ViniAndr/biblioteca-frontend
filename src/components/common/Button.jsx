const Button = ({
  size = "md",
  variant = "primary",
  rounded = "",
  onClick,
  className = "",
  disabled,
  type = "button", // Valor padrão adicionado
  children,
}) => {
  const sizes = {
    full: "w-full py-2 px-4 text-base",
    md: "w-auto py-1 px-3 text-base",
    sm: "w-auto py-1 px-2 text-sm",
    xs: "w-auto py-1 px-2 text-xs",
    square: "p-1",
  };

  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold",
    delete: "bg-red-400 hover:bg-red-500 text-white font-bold",
    back: "bg-gray-500 hover:bg-gray-600 text-white font-bold",
    ghost: "font-medium hover:bg-gray-200",
    outline: "border border-zinc-300",
    disabled: "bg-gray-400 cursor-not-allowed flex justify-center text-white font-bold",
    muted: "bg-transparent text-zinc-500 hover:text-zinc-600",
  };

  const baseClass = `
    rounded cursor-pointer transition duration-300 ease-in-out outline-none
    ${sizes[size]}
    ${disabled ? variants.disabled : variants[variant]}
    ${rounded}
    ${className}
  `;

  return (
    <button className={baseClass} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
