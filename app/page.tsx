import { Hero } from "@/components/home/Hero";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <NewsletterSection />
      <AboutTeaser />
    </>
  );
}
