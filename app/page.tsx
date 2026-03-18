import Navbar from "./components/Navbar";
import MarqueeBanner from "./components/MarqueeBanner";
import Hero from "./components/Hero";
import CollectionGrid from "./components/CollectionGrid";
import BrandStatement from "./components/BrandStatement";
import FeaturedProducts from "./components/FeaturedProducts";
import SocialFeed from "./components/SocialFeed";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />
      <MarqueeBanner />
      <Hero />
      <CollectionGrid />
      <BrandStatement />
      <FeaturedProducts />
      <SocialFeed />
      <Footer />
    </main>
  );
}
