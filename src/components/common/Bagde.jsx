function Badge({ text, variant }) {
  const variants = {
    outline: "border-1 border-zinc-300 bg-white hover:bg-zinc-800 hover:text-white cursor-pointer",
  };

  const styleBase = `px-2 text-sm font-medium inline-block rounded-3xl transition duration-300 ease-in-out ${variants[variant]}`;
  return (
    // <Badge className="mb-4 px-3 py-1 text-sm animate-pulse">Novos livros toda semana</Badge>
    <div className={styleBase}>{text}</div>
  );
}

export default Badge;
