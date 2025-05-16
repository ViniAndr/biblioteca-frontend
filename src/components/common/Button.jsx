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
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-pointer",
    delete: "bg-red-400 hover:bg-red-500 text-white font-bold cursor-pointer",
    back: "bg-gray-500 hover:bg-gray-600 text-white font-bold cursor-pointer",
    ghost: "font-medium hover:bg-gray-200 cursor-pointer",
    outline: "border border-zinc-300 cursor-pointer",
    disabled: "bg-gray-400 cursor-not-allowed text-white font-bold",
    muted: "bg-transparent text-zinc-500 hover:text-zinc-600 cursor-pointer",
  };

  const baseClass = `
    rounded transition duration-300 ease-in-out outline-none
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
