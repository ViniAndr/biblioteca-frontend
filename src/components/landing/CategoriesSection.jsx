// Components
import CategoryCard from "../common/categoryCard";

// Icones
import { LuCompass, LuFlashlight, LuHeart, LuPyramid, LuPuzzle } from "react-icons/lu";

const categories = [
  {
    title: "Ficção",
    description: "Mergulhe em mundos imaginários e histórias cativantes.",
    icon: <LuFlashlight className="h-5 w-5" />,
    count: 235,
    color: "bg-blue-500",
  },
  {
    title: "Mistério",
    description: "Desvende enigmas e acompanhe detetives empolgantes.",
    icon: <LuPuzzle className="h-5 w-5" />,
    count: 187,
    color: "bg-red-500",
  },
  {
    title: "Romance",
    description: "Apaixone-se por histórias de amor inesquecíveis.",
    icon: <LuHeart className="h-5 w-5" />,
    count: 212,
    color: "bg-pink-500",
  },
  {
    title: "Aventura",
    description: "Explore lugares desconhecidos e viva grandes emoções.",
    icon: <LuPyramid className="h-5 w-5" />,
    count: 198,
    color: "bg-green-500",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        {/* Titulo */}
        <div className="flex items-center gap-2 mb-6">
          <LuCompass className="text-3xl" />
          <h2 className="text-3xl font-bold tracking-tight">Explore por Categoria</h2>
        </div>

        {/* Grupo de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
