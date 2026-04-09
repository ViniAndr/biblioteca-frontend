// Components
import SecaoBeneficios from "../components/landing/SecaoBeneficios";
import SecaoComoFunciona from "../components/landing/SecaoComoFunciona";
import SecaoHero from "../components/landing/SecaoHero";
import SecaoTopLivros from "../components/landing/SecaoTopLivros";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <SecaoHero />
      <SecaoTopLivros />
      <SecaoBeneficios />
      <SecaoComoFunciona />
    </div>
  );
};

export default Home;
