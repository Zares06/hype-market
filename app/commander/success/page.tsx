"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-hype-light pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-hype-success/20 flex items-center justify-center mx-auto mb-8 text-5xl"
        >
          ✓
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-display font-black uppercase text-hype-dark text-4xl mb-4">
            Commande confirmée !
          </h1>
          <p className="font-body text-hype-brown text-lg mb-2">
            Merci pour votre commande 🎉
          </p>
          <p className="font-body text-hype-brown/70 mb-10">
            Vous recevrez une confirmation par email. Notre équipe prépare votre
            commande avec soin.
          </p>

          <div className="bg-hype-cream rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏪</span>
              <div>
                <p className="font-display font-bold text-hype-dark text-sm uppercase">
                  Hype Market
                </p>
                <p className="font-body text-hype-brown text-xs">
                  22 Rue Bottero, 06000 Nice
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🕐</span>
              <div>
                <p className="font-display font-bold text-hype-dark text-sm uppercase">
                  Horaires
                </p>
                <p className="font-body text-hype-brown text-xs">
                  Lundi – Dimanche : 15h00 – 23h00
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button variant="primary">Continuer les achats</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Retour à l&apos;accueil</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
