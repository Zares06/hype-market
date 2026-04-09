"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const words = ["Voyagez", "à", "travers", "les", "saveurs", "du", "monde"];

// Produits flottants autour du titre
const FLOATING_PRODUCTS = [
  { emoji: "🍫", name: "Dubai Choco", price: "12.90€", flag: "🇦🇪", color: "#C9A87C", top: "18%", left: "2%", delay: 0 },
  { emoji: "🌶️", name: "Takis Fuego", price: "3.90€", flag: "🇲🇽", color: "#D4B896", top: "15%", right: "2%", delay: 0.3 },
  { emoji: "🥤", name: "Ramune", price: "2.50€", flag: "🇯🇵", color: "#E8D5B7", bottom: "28%", left: "1%", delay: 0.6 },
  { emoji: "🍬", name: "Hi-Chew", price: "3.80€", flag: "🇯🇵", color: "#D9C4A5", bottom: "25%", right: "1%", delay: 0.9 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-hype-cream via-hype-light to-hype-sand/40">
      {/* Blobs décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-hype-sand/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-hype-brown/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-hype-sand/10 blur-3xl" />
      </div>

      {/* Produits flottants — cachés sur mobile */}
      {FLOATING_PRODUCTS.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className="absolute hidden md:flex items-center gap-2 rounded-2xl px-3 py-2 shadow-card-hover border border-white/30 backdrop-blur-sm select-none"
          style={{
            backgroundColor: p.color,
            top: p.top,
            bottom: (p as { bottom?: string }).bottom,
            left: (p as { left?: string }).left,
            right: (p as { right?: string }).right,
          }}
        >
          <span className="text-2xl">{p.emoji}</span>
          <div>
            <p className="font-display font-bold text-hype-dark text-xs uppercase leading-tight">{p.name}</p>
            <p className="font-body text-hype-brown text-xs">{p.flag} {p.price}</p>
          </div>
        </motion.div>
      ))}

      {/* Contenu principal — pt-20 sur mobile pour passer sous le header */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 md:pt-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-hype-sand/40 border border-hype-sand rounded-full px-4 py-2 mb-6"
        >
          <span className="text-sm">🌍</span>
          <span className="font-display font-bold uppercase tracking-widest text-hype-brown text-xs">
            Épicerie internationale · Nice
          </span>
        </motion.div>

        {/* Titre animé mot par mot */}
        <h1
          className="font-display font-black uppercase leading-none text-hype-dark mb-6"
          style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}
        >
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-0">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-body text-base md:text-xl text-hype-brown max-w-xl mx-auto mb-8"
        >
          Snacks, boissons et spécialités du monde entier.
          Dubaï, Japon, Mexique, Corée… des saveurs introuvables ailleurs.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/catalogue">
            <Button variant="primary" size="lg">Explorer le catalogue</Button>
          </Link>
          <Link href="/catalogue?onlyNew=true">
            <Button variant="ghost" size="lg">Les nouveautés</Button>
          </Link>
        </motion.div>

        {/* Drapeaux défilants sur mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-3 mt-6 text-2xl md:hidden"
        >
          {["🇯🇵", "🇲🇽", "🇦🇪", "🇺🇸", "🇰🇷", "🇹🇭", "🇩🇪"].map((flag, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            >
              {flag}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-hype-sand/30"
        >
          {[
            { value: "20+", label: "Pays" },
            { value: "200+", label: "Produits" },
            { value: "7j/7", label: "Ouvert" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-black text-hype-dark text-2xl md:text-3xl">{stat.value}</p>
              <p className="font-body text-hype-brown text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-hype-brown/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
