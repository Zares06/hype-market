"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/Button";

// Region placeholder colors
const REGION_COLORS: Record<string, string> = {
  asie: "#E8D5B7",
  "amerique-latine": "#D4B896",
  "moyen-orient": "#C9A87C",
  afrique: "#BF9A6B",
  europe: "#D9C4A5",
  "amerique-nord": "#C5A882",
};

export default function PanierPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();

  const cartTotal = total();
  const count = itemCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-hype-light pt-20 flex flex-col items-center justify-center gap-6 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 rounded-full bg-hype-sand/30 flex items-center justify-center"
        >
          <ShoppingBag className="w-12 h-12 text-hype-sand" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-display font-black uppercase text-hype-dark text-3xl mb-3">
            Votre panier est vide
          </h1>
          <p className="font-body text-hype-brown mb-8">
            Découvrez nos produits du monde entier et commencez votre voyage.
          </p>
          <Link href="/catalogue">
            <Button variant="primary" size="lg">
              Explorer le catalogue
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hype-light pt-20">
      {/* Header */}
      <div className="bg-hype-cream border-b border-hype-sand/30">
        <div className="section-container py-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-sm font-body text-hype-brown hover:text-hype-dark transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Continuer mes achats
          </Link>
          <h1 className="font-display font-black uppercase tracking-tight text-hype-dark text-4xl md:text-5xl">
            Mon panier
          </h1>
          <p className="font-body text-hype-brown mt-1">
            {count} article{count > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Items list */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const bgColor =
                  REGION_COLORS[item.product.region] || "#C5A882";

                return (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 bg-hype-cream rounded-2xl p-5 shadow-card"
                  >
                    {/* Product image / placeholder */}
                    <Link
                      href={`/produit/${item.product.slug}`}
                      className="shrink-0"
                    >
                      <div
                        className="w-24 h-24 md:w-28 md:h-28 rounded-xl flex items-center justify-center text-3xl md:text-4xl"
                        style={{ backgroundColor: bgColor }}
                      >
                        {item.product.originFlag}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-body text-hype-brown/70 text-xs mb-0.5">
                            {item.product.brand}
                          </p>
                          <Link href={`/produit/${item.product.slug}`}>
                            <h3 className="font-display font-bold text-hype-dark leading-tight hover:text-hype-brown transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.product.weight && (
                            <p className="font-body text-hype-brown/60 text-xs mt-0.5">
                              {item.product.weight}
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 rounded-full hover:bg-red-50 text-hype-brown/50 hover:text-red-400 transition-colors shrink-0"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Bottom: quantity + price */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 border border-hype-sand rounded-full px-3 py-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-hype-dark hover:text-hype-brown transition-colors"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-display font-bold text-hype-dark w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-hype-dark hover:text-hype-brown transition-colors"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-display font-black text-hype-brown text-xl">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-hype-cream rounded-3xl p-6 shadow-card">
              <h2 className="font-display font-black uppercase tracking-tight text-hype-dark text-xl mb-6">
                Récapitulatif
              </h2>

              {/* Line items summary */}
              <div className="space-y-2 mb-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="font-body text-hype-brown truncate mr-4 max-w-[180px]">
                      {item.product.name}{" "}
                      <span className="text-hype-brown/60">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="font-body text-hype-dark font-medium shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-hype-sand/30 pt-4 space-y-3">
                <div className="flex justify-between font-body text-sm text-hype-brown">
                  <span>Livraison</span>
                  <span>Calculée à l&apos;étape suivante</span>
                </div>
                <div className="flex justify-between font-display font-black text-hype-dark text-2xl pt-2 border-t border-hype-sand/30">
                  <span>Sous-total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <Link href="/commander" className="block mt-6">
                <Button variant="primary" size="lg" className="w-full">
                  Commander
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <p className="text-center text-xs text-hype-brown/60 font-body mt-3">
                🔒 Paiement sécurisé par Stripe
              </p>

              <div className="mt-6 pt-6 border-t border-hype-sand/30 flex flex-col gap-2 text-xs font-body text-hype-brown/70">
                <div className="flex items-center gap-2">
                  <span>🏪</span>
                  <span>Retrait gratuit — 22 Rue Bottero, Nice</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Livraison à domicile disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
