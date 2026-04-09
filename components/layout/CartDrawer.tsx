"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, total, itemCount } =
    useCartStore();

  const cartTotal = total();
  const count = itemCount();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-hype-dark"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-hype-light flex flex-col shadow-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-hype-sand/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-hype-brown" />
                <span className="font-display font-black uppercase tracking-tight text-hype-dark text-xl">
                  Panier
                </span>
                {count > 0 && (
                  <span className="bg-hype-brown text-hype-cream text-xs font-display font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
              >
                <X className="w-5 h-5 text-hype-dark" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-hype-sand/30 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-hype-sand" />
                  </div>
                  <p className="font-display font-bold text-hype-dark text-lg uppercase">
                    Panier vide
                  </p>
                  <p className="text-hype-brown font-body text-sm">
                    Découvrez nos produits du monde
                  </p>
                  <Button variant="primary" size="sm" onClick={closeDrawer}>
                    <Link href="/catalogue">Explorer</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-hype-cream rounded-2xl p-4 shadow-card"
                  >
                    {/* Image placeholder */}
                    <div className="w-20 h-20 rounded-xl bg-hype-sand/30 flex items-center justify-center shrink-0 text-2xl">
                      {item.product.originFlag}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-hype-dark text-sm leading-tight truncate">
                        {item.product.name}
                      </p>
                      <p className="text-hype-brown text-xs font-body mt-0.5">
                        {item.product.brand}
                      </p>
                      <p className="font-display font-bold text-hype-brown mt-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-hype-sand flex items-center justify-center hover:bg-hype-sand/30 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-hype-dark" />
                        </button>
                        <span className="font-display font-bold text-hype-dark w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-hype-sand flex items-center justify-center hover:bg-hype-sand/30 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-hype-dark" />
                        </button>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1.5 rounded-full hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-hype-sand/30 space-y-4 bg-hype-cream">
                <div className="flex items-center justify-between">
                  <span className="font-body text-hype-brown">Sous-total</span>
                  <span className="font-display font-black text-hype-dark text-xl">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-hype-brown/70 font-body">
                  Livraison calculée à la commande
                </p>
                <Link href="/commander" onClick={closeDrawer} className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Commander
                  </Button>
                </Link>
                <button
                  onClick={closeDrawer}
                  className="w-full text-center text-sm text-hype-brown hover:text-hype-dark font-body transition-colors"
                >
                  Continuer mes achats →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
