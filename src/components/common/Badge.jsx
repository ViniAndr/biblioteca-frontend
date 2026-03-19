const Badge = ({ variante = "primary", tamanho = "sm", className = "", children }) => {
  const tamanhos = {
    xs: "text-[10px] px-2 py-0.5",
    sm: "text-xs px-2",
    md: "text-xs px-2 py-1",
  };

  const variantes = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-default",
    outlineHover: "border border-zinc-300 bg-white hover:bg-zinc-800 hover:text-white cursor-pointer font-medium",
    outline: "border border-zinc-300 bg-white cursor-default",
  };

  const estiloBase = `inline-block rounded-full transition duration-300 ease-in-out ${variantes[variante]} ${tamanhos[tamanho]} ${className}`;
  return <div className={estiloBase}>{children}</div>;
};

export default Badge;
