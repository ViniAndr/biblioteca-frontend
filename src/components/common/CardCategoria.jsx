// Components
import Badge from "./Badge";
import Botao from "./Botao";

const CardCategoria = ({ categoria }) => {
  return (
    <div className=" bg-white overflow-hidden rounded-xl group shadow hover:shadow-lg transition-all hover:scale-105 duration-300">
      {/* imagem e titulo */}
      <div className={`relative aspect-video ${categoria.cor}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Titulo */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {categoria.icone}
          <span className="font-bold text-lg">{categoria.titulo}</span>
        </div>
      </div>

      {/* Conteudo do card */}
      <div className="min-h-28 p-4 flex flex-col">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{categoria.descricao}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variante="outline">{categoria.quantidade} livros</Badge>
          <Botao variante="primary" tamanho="sm">
            Explorar
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default CardCategoria;
