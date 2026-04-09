"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-hype-sand/20 flex items-center justify-center mb-6 text-5xl">
          🔍
        </div>
        <h3 className="font-display font-black uppercase text-hype-dark text-xl mb-2">
          Aucun produit trouvé
        </h3>
        <p className="font-body text-hype-brown max-w-sm mb-6">
          Essayez d&apos;ajuster vos filtres ou de rechercher autre chose.
        </p>
        <Link href="/catalogue">
          <Button variant="ghost">Réinitialiser les filtres</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="font-body text-hype-brown text-sm mb-6">
        {products.length} produit{products.length > 1 ? "s" : ""} trouvé
        {products.length > 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
