"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

const featured = PRODUCTS.filter((p) => p.isFeatured);

export function FeaturedProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="section-padding bg-hype-cream">
      <div className="section-container">
        {/* Header section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-display font-bold uppercase tracking-widest text-hype-brown text-xs mb-2">
              Sélection
            </p>
            <h2 className="font-display font-black uppercase tracking-tight text-hype-dark text-3xl md:text-4xl lg:text-5xl leading-none">
              Les incontournables
            </h2>
            <p className="font-body text-hype-brown mt-3 text-sm md:text-base max-w-sm">
              Les produits les plus demandés — testés, validés, adorés.
            </p>
          </div>

          {/* Contrôles desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border-2 border-hype-sand flex items-center justify-center hover:bg-hype-brown hover:border-hype-brown hover:text-hype-cream text-hype-dark transition-all duration-200"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border-2 border-hype-sand flex items-center justify-center hover:bg-hype-brown hover:border-hype-brown hover:text-hype-cream text-hype-dark transition-all duration-200"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-1" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4 px-1">
            {featured.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-hype-sand/30">
          <p className="font-body text-hype-brown/60 text-sm">
            {featured.length} produits dans la sélection
          </p>
          <Link href="/catalogue">
            <Button variant="ghost">
              Voir tout le catalogue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
