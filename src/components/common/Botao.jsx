const Botao = ({
  tamanho = "md",
  variante = "primary",
  arredondamento = "rounded-md",
  onClick,
  className = "",
  disabled,
  type = "button", // Propriedades HTML nativas (type, disabled, onClick) mantidas
  children,
}) => {
  const tamanhos = {
    full: "w-full py-2 px-4 text-base",
    md: "w-auto py-1 px-3 text-base",
    sm: "w-auto py-1 px-2 text-sm",
    xs: "w-auto py-1 px-2 text-xs",
    square: "p-1",
  };

  const variantes = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-pointer",
    danger: "bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm cursor-pointer",
    delete: "bg-red-400 hover:bg-red-500 text-white font-bold cursor-pointer",
    back: "bg-gray-500 hover:bg-gray-600 text-white font-bold cursor-pointer",
    ghost: "font-medium hover:bg-gray-200 cursor-pointer",
    outline: "border border-zinc-300 cursor-pointer",
    disabled: "bg-gray-400 cursor-not-allowed text-white font-bold",
    muted: "bg-transparent text-zinc-500 hover:text-zinc-600 cursor-pointer",
  };

  const classeBase = `
    rounded transition duration-300 ease-in-out outline-none
    ${tamanhos[tamanho]}
    ${disabled ? variantes.disabled : variantes[variante]}
    ${arredondamento}
    ${className}
  `;

  return (
    <button className={classeBase} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Botao;
