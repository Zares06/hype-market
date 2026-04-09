"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SHOP_CATEGORIES = [
  {
    id: "boisson",
    nameFr: "Boissons",
    description: "Ramune, Boba, B'lue, Mogu Mogu…",
    icon: "🥤",
    color: "#B8D9F0",
    textColor: "#1a3d5c",
  },
  {
    id: "snack",
    nameFr: "Snacks",
    description: "Takis, Cheetos, Calbee, Pringles…",
    icon: "🍟",
    color: "#F5C842",
    textColor: "#3d2800",
  },
  {
    id: "confiserie",
    nameFr: "Bonbons",
    description: "Hi-Chew, Warheads, Haribo, Mochi…",
    icon: "🍬",
    color: "#F4A7C3",
    textColor: "#5c1a35",
  },
  {
    id: "chocolat",
    nameFr: "Chocolat",
    description: "Dubai Choco, Kit Kat Matcha, Kinder…",
    icon: "🍫",
    color: "#C9A87C",
    textColor: "#2C1810",
  },
  {
    id: "biscuit",
    nameFr: "Biscuits",
    description: "Pocky, Oreo Matcha, Pepero…",
    icon: "🍪",
    color: "#D4B896",
    textColor: "#2C1810",
  },
  {
    id: "epice",
    nameFr: "Épices & Sauces",
    description: "Tajín, Valentina, sriracha…",
    icon: "🌶️",
    color: "#F07A4A",
    textColor: "#fff",
  },
];

export function CategoryGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-hype-light">
      <div className="section-container">
        <SectionHeading
          title="Que cherchez-vous ?"
          subtitle="Naviguez par type de produit et trouvez ce qui vous fait envie."
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SHOP_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/catalogue?category=${cat.id}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: cat.color }}
                />

                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2)_0%,transparent_70%)]" />

                {/* Big icon */}
                <div className="absolute top-3 left-4 text-4xl md:text-5xl filter drop-shadow-sm">
                  {cat.icon}
                </div>

                {/* Arrow */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: cat.textColor }} />
                </div>

                {/* Content */}
                <div className="relative p-3 md:p-4">
                  <h3
                    className="font-display font-black uppercase tracking-tight text-sm md:text-base leading-tight"
                    style={{ color: cat.textColor }}
                  >
                    {cat.nameFr}
                  </h3>
                  <p
                    className="font-body text-xs mt-0.5 hidden md:block opacity-70"
                    style={{ color: cat.textColor }}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
