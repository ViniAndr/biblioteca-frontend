// Components
import HeroSection from "../components/landing/HeroSection";
import TopBooksSection from "../components/landing/TopBooksSection";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <HeroSection />
      <TopBooksSection />
    </div>
  );
}
