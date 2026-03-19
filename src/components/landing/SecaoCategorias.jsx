// Components
import CardCategoria from "../common/CardCategoria";

// Icones
import { LuCompass, LuFlashlight, LuHeart, LuPyramid, LuPuzzle } from "react-icons/lu";

const categorias = [
  {
    titulo: "Ficção",
    descricao: "Mergulhe em mundos imaginários e histórias cativantes.",
    icone: <LuFlashlight className="h-5 w-5" />,
    quantidade: 235,
    cor: "bg-blue-500",
  },
  {
    titulo: "Mistério",
    descricao: "Desvende enigmas e acompanhe detetives empolgantes.",
    icone: <LuPuzzle className="h-5 w-5" />,
    quantidade: 187,
    cor: "bg-red-500",
  },
  {
    titulo: "Romance",
    descricao: "Apaixone-se por histórias de amor inesquecíveis.",
    icone: <LuHeart className="h-5 w-5" />,
    quantidade: 212,
    cor: "bg-pink-500",
  },
  {
    titulo: "Aventura",
    descricao: "Explore lugares desconhecidos e viva grandes emoções.",
    icone: <LuPyramid className="h-5 w-5" />,
    quantidade: 198,
    cor: "bg-green-500",
  },
];

const SecaoCategorias = () => {
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
          {categorias.map((categoria, index) => (
            <CardCategoria key={index} categoria={categoria} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecaoCategorias;
