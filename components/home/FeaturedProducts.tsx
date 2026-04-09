"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            title="Les incontournables"
            subtitle="Les produits les plus demandés par notre communauté."
            centered={false}
            className="mb-0"
          />
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border-2 border-hype-sand flex items-center justify-center hover:bg-hype-brown hover:border-hype-brown hover:text-hype-cream transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border-2 border-hype-sand flex items-center justify-center hover:bg-hype-brown hover:border-hype-brown hover:text-hype-cream transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {featured.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[220px] sm:w-[260px] md:w-[280px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/catalogue">
            <Button variant="ghost">Voir tout le catalogue</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
