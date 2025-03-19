function Benefit({ beneficio }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Coluna do texto */}
        <div>
          <div
            className={`p-4 inline-flex items-center justify-center rounded-full bg-gradient-to-br ${beneficio.color} text-white mb-6`}
          >
            {beneficio.icon}
          </div>

          {/* Titulo e descrição */}
          <h3 className="text-3xl font-bold mb-4">{beneficio.title}</h3>
          <p className="text-lg text-muted-foreground mb-8">{beneficio.description}</p>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Dados Interessantes:</h4>
            <ul className="space-y-3">
              {/* Lista os Dados Interessantes */}
              {beneficio.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full text-white bg-emerald-300 flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">{index + 1}</span>
                  </div>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna da imagem */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${beneficio.color} opacity-80`}></div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={beneficio.image || ""} alt={beneficio.title} className="object-cover mix-blend-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
