"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Check, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

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
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const bgColor = REGION_COLORS[product.region] || "#C5A882";
  const hasRealImage =
    product.images[0] &&
    !product.images[0].includes("placeholder") &&
    !imgError;

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(44,24,16,0.07)] hover:shadow-[0_12px_40px_rgba(44,24,16,0.16)] transition-shadow duration-300 flex flex-col h-full"
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "1/1",
            backgroundColor: hasRealImage ? "#fafaf8" : bgColor,
          }}
        >
          {hasRealImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-5xl md:text-6xl filter drop-shadow-md">
                {product.originFlag}
              </span>
              <span className="font-display font-bold text-hype-dark/25 text-[10px] uppercase tracking-widest px-4 text-center leading-tight">
                {product.name}
              </span>
            </div>
          )}

          {/* Badge Nouveau */}
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 bg-hype-brown text-hype-cream font-display font-bold uppercase tracking-widest text-[9px] px-2 py-1 rounded-full">
              Nouveau
            </span>
          )}

          {/* Origine */}
          <span className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-sm text-hype-dark font-body text-[10px] px-2 py-1 rounded-full border border-hype-sand/30">
            {product.originFlag} {product.originCountry}
          </span>

          {/* Bouton ajout rapide — slide depuis le bas */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAdd}
              className={cn(
                "w-full py-3 flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest text-xs transition-colors duration-200",
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-hype-brown text-hype-cream hover:bg-hype-dark"
              )}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Ajouté !
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter au panier
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Infos ── */}
        <div className="p-3.5 flex flex-col flex-1">
          <p className="font-body text-hype-brown/50 text-[10px] uppercase tracking-wider mb-1">
            {product.brand}
          </p>

          <h3 className="font-display font-bold text-hype-dark text-sm leading-snug line-clamp-2 group-hover:text-hype-brown transition-colors duration-200 flex-1">
            {product.name}
          </h3>

          {product.weight && (
            <p className="font-body text-hype-brown/40 text-xs mt-1">
              {product.weight}
            </p>
          )}

          {/* Prix + ajout mobile */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-hype-sand/20">
            <span className="font-display font-black text-hype-brown text-lg leading-none">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAdd}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
                added
                  ? "bg-emerald-500 text-white scale-110"
                  : "bg-hype-sand/40 hover:bg-hype-brown hover:text-hype-cream text-hype-dark active:scale-90"
              )}
              aria-label={added ? "Ajouté" : "Ajouter au panier"}
            >
              {added ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
