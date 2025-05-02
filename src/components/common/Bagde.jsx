const Badge = ({ variant = "primary", size = "sm", className = "", children }) => {
  const sizes = {
    xs: "text-[10px] px-2 py-0.5",
    sm: "text-xs px-2",
    md: "text-xs px-2 py-1",
  };

  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-default",
    outlineHover: "border border-zinc-300 bg-white hover:bg-zinc-800 hover:text-white cursor-pointer font-medium",
    outline: "border border-zinc-300 bg-white cursor-default",
  };

  const styleBase = `inline-block rounded-full transition duration-300 ease-in-out ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    // <Badge className="mb-4 px-3 py-1 text-sm animate-pulse">Novos livros toda semana</Badge>
    <div className={styleBase}>{children}</div>
  );
};

export default Badge;
