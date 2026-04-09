import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductCard } from "@/components/product/ProductCard";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

// Region background colors for placeholder
const REGION_COLORS: Record<string, string> = {
  asie: "#E8D5B7",
  "amerique-latine": "#D4B896",
  "moyen-orient": "#C9A87C",
  afrique: "#BF9A6B",
  europe: "#D9C4A5",
  "amerique-nord": "#C5A882",
};

export default function ProductPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.region === product.region && p.id !== product.id
  ).slice(0, 4);

  const bgColor = REGION_COLORS[product.region] || "#C5A882";

  return (
    <div className="min-h-screen bg-hype-light pt-20">
      <div className="section-container py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-hype-brown mb-8">
          <Link href="/catalogue" className="flex items-center gap-1 hover:text-hype-dark transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Catalogue
          </Link>
          <span>/</span>
          <span className="text-hype-dark">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div
            className="aspect-square rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-4 bg-white shadow-card"
            style={{
              backgroundColor:
                product.images[0] && !product.images[0].includes("placeholder")
                  ? "#fafaf8"
                  : bgColor,
            }}
          >
            {product.images[0] && !product.images[0].includes("placeholder") ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <>
                <span className="text-8xl md:text-9xl filter drop-shadow-lg">
                  {product.originFlag}
                </span>
                <span className="font-display font-bold text-hype-dark/30 text-sm uppercase tracking-widest px-8 text-center">
                  {product.name}
                </span>
              </>
            )}
          </div>

          {/* Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-black uppercase tracking-tight text-hype-dark text-2xl md:text-3xl mb-8">
              De la même région
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
