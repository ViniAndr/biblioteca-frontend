// Components
import HeroSection from "../components/landing/HeroSection";
import TopBooksSection from "../components/landing/TopBooksSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import CategoriesSection from "../components/landing/CategoriesSection";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <HeroSection />
      <TopBooksSection />
      <BenefitsSection />
      <CategoriesSection />
    </div>
  );
};

export default Home;
