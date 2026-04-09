"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

// Placeholder colors per region
const REGION_COLORS: Record<string, string> = {
  asie: "#E8D5B7",
  "amerique-latine": "#D4B896",
  "moyen-orient": "#C9A87C",
  afrique: "#BF9A6B",
  europe: "#D9C4A5",
  "amerique-nord": "#C5A882",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const bgColor = REGION_COLORS[product.region] || "#C5A882";

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-hype-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: bgColor }}>
          {/* Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-6xl filter drop-shadow">{product.originFlag}</span>
            <span className="font-display font-bold text-hype-dark/40 text-xs uppercase tracking-wider px-4 text-center">
              {product.name}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">Nouveau</Badge>}
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="origin">{product.originFlag} {product.originCountry}</Badge>
          </div>

          {/* Quick add button */}
          <motion.button
            onClick={handleAdd}
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            className={cn(
              "absolute bottom-0 left-0 right-0 py-3 flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest text-xs transition-colors duration-200",
              added
                ? "bg-hype-success text-white"
                : "bg-hype-brown text-hype-cream hover:bg-hype-dark"
            )}
          >
            {added ? (
              <>✓ Ajouté</>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Ajouter
              </>
            )}
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-body text-hype-brown/70 text-xs mb-1">{product.brand}</p>
          <h3 className="font-display font-bold text-hype-dark text-sm leading-tight line-clamp-2 group-hover:text-hype-brown transition-colors">
            {product.name}
          </h3>
          {product.weight && (
            <p className="font-body text-hype-brown/60 text-xs mt-1">{product.weight}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="font-display font-black text-hype-brown text-lg">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAdd}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                added
                  ? "bg-hype-success text-white"
                  : "bg-hype-sand/30 hover:bg-hype-brown hover:text-hype-cream text-hype-dark"
              )}
              aria-label="Ajouter au panier"
            >
              {added ? (
                <span className="text-xs">✓</span>
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
