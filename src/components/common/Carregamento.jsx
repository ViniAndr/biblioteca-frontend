const Carregamento = ({ texto = "Carregando...", alturaMinima = "min-h-[400px]" }) => {
  return (
    <div className={`flex justify-center items-center w-full ${alturaMinima}`}>
      <div className="animate-pulse flex flex-col items-center gap-3">
        {/* O círculo que gira */}
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-blue-600 rounded-full animate-spin"></div>
        {/* O texto opcional abaixo dele */}
        <p className="text-zinc-500 text-sm font-medium">{texto}</p>
      </div>
    </div>
  );
};

export default Carregamento;
