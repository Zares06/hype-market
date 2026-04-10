"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/Button";
import { Globe, Star, MapPin } from "lucide-react";

const values = [
  { icon: Globe, title: "Authenticité", desc: "Produits importés directement depuis leurs pays d'origine." },
  { icon: Star, title: "Sélection", desc: "Chaque produit est choisi avec soin pour sa qualité et son unicité." },
  { icon: MapPin, title: "Local", desc: "Basés à Nice, nous servons notre communauté avec passion." },
];

export function AboutTeaser() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="section-padding bg-hype-dark overflow-hidden">
      <div className="section-container">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-display font-bold uppercase tracking-widest text-hype-sand text-xs">
              Notre histoire
            </span>
            <h2
              className="font-display font-black uppercase text-hype-cream mt-3 mb-6 leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Une épicerie,<br />tout un monde
            </h2>
            <p className="font-body text-hype-cream/70 leading-relaxed mb-4">
              Hype Market est né d&apos;une passion pour la découverte culinaire. Nous avons
              sillonné le monde pour ramener à Nice ce que vous ne trouvez nulle part ailleurs.
            </p>
            <p className="font-body text-hype-cream/70 leading-relaxed mb-8">
              Dubai Chocolate, Takis, Ramune, Samyang… des produits qui font voyager,
              sélectionnés pour leur authenticité et leur qualité.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 gap-4 mb-10">
              {values.map((val) => (
                <div key={val.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-hype-sand/20 flex items-center justify-center shrink-0 mt-0.5">
                    <val.icon className="w-4 h-4 text-hype-sand" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-hype-cream text-sm uppercase tracking-wide">
                      {val.title}
                    </p>
                    <p className="font-body text-hype-cream/60 text-sm">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/a-propos">
              <Button variant="sand">Découvrir notre histoire</Button>
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Logo / mascotte central + grille produits */}
            <div className="grid grid-cols-3 gap-3">
              {/* Case centrale = logo mascotte */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="aspect-square rounded-2xl overflow-hidden col-start-2 row-start-1 shadow-card-hover border-2 border-hype-sand/30"
              >
                <img
                  src="/images/logo.png"
                  alt="Mascotte Hype Market"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "top" }}
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
              </motion.div>
              {/* Autres cases emojis */}
              {[
                { e: "🍫", col: 1, row: 1 },
                { e: "🌶️", col: 3, row: 1 },
                { e: "🥤", col: 1, row: 2 },
                { e: "🍬", col: 2, row: 2 },
                { e: "🍟", col: 3, row: 2 },
                { e: "🍪", col: 1, row: 3 },
                { e: "🫙", col: 2, row: 3 },
                { e: "🧃", col: 3, row: 3 },
              ].map(({ e, col, row }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="aspect-square rounded-2xl bg-hype-brown/20 flex items-center justify-center text-4xl"
                  style={{ gridColumn: col, gridRow: row }}
                >
                  {e}
                </motion.div>
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-hype-sand rounded-2xl p-4 shadow-card-hover"
            >
              <p className="font-display font-black text-hype-dark text-2xl">20+</p>
              <p className="font-body text-hype-dark/70 text-xs">Pays représentés</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
