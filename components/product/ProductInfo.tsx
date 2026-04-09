"use client";

import { useState } from "react";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="origin">
          {product.originFlag} {product.originCountry}
        </Badge>
        {product.isNew && <Badge variant="new">Nouveau</Badge>}
        {product.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="tag">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Brand + Name */}
      <div>
        <p className="font-body text-hype-brown font-medium text-sm mb-1">
          {product.brand}
        </p>
        <h1 className="font-display font-black uppercase leading-tight text-hype-dark text-3xl md:text-4xl">
          {product.name}
        </h1>
        {product.weight && (
          <p className="font-body text-hype-brown/70 text-sm mt-1">{product.weight}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display font-black text-hype-brown text-4xl">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="font-body text-hype-brown/50 text-xl line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-body text-hype-dark/80 leading-relaxed">{product.description}</p>

      {/* Stock status */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            product.inStock ? "bg-hype-success" : "bg-hype-error"
          }`}
        />
        <span className="font-body text-sm text-hype-dark">
          {product.inStock
            ? `En stock${product.stockCount ? ` — ${product.stockCount} disponibles` : ""}`
            : "Rupture de stock"}
        </span>
      </div>

      {/* Quantity + Add */}
      <div className="flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center gap-3 border border-hype-sand rounded-full px-4 py-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-hype-dark hover:text-hype-brown transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-display font-bold text-hype-dark w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-hype-dark hover:text-hype-brown transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart */}
        <Button
          onClick={handleAdd}
          disabled={!product.inStock}
          variant={added ? "dark" : "primary"}
          size="lg"
          className="flex-1"
        >
          {added ? "✓ Ajouté au panier !" : "Ajouter au panier"}
        </Button>
      </div>

      {/* Ingredients accordion */}
      {product.ingredients && (
        <div className="border border-hype-sand/50 rounded-2xl overflow-hidden">
          <button
            onClick={() => setIngredientsOpen(!ingredientsOpen)}
            className="w-full flex items-center justify-between px-5 py-4 font-display font-bold uppercase tracking-wide text-sm text-hype-dark hover:bg-hype-sand/10 transition-colors"
          >
            Ingrédients
            {ingredientsOpen ? (
              <ChevronUp className="w-4 h-4 text-hype-brown" />
            ) : (
              <ChevronDown className="w-4 h-4 text-hype-brown" />
            )}
          </button>
          {ingredientsOpen && (
            <div className="px-5 pb-4 font-body text-sm text-hype-dark/70 leading-relaxed border-t border-hype-sand/30">
              {product.ingredients}
            </div>
          )}
        </div>
      )}

      {/* Origin info */}
      <div className="bg-hype-cream rounded-2xl p-5">
        <p className="font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
          Origine
        </p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{product.originFlag}</span>
          <div>
            <p className="font-body font-medium text-hype-dark">{product.originCountry}</p>
            <p className="font-body text-xs text-hype-brown capitalize">{product.region.replace("-", " ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
