// Components
import Badge from "./Bagde";
import Button from "./Button";

const CategoryCard = ({ category }) => {
  return (
    <div className=" bg-white overflow-hidden rounded-xl group shadow hover:shadow-lg transition-all hover:scale-105 duration-300">
      {/* imagem e titulo */}
      <div className={`relative aspect-video ${category.color}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Titulo */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {category.icon}
          <span className="font-bold text-lg">{category.title}</span>
        </div>
      </div>

      {/* Conteudo do card */}
      <div className="min-h-28 p-4 flex flex-col">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{category.count} livros</Badge>
          <Button variant="primary" size="sm">
            Explorar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
