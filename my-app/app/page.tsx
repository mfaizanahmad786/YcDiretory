import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecommendedStartups from "@/components/RecommendedStartups";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <RecommendedStartups />
    </div>
  );
}
