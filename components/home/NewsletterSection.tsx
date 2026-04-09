"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    // Simulate newsletter subscription (replace with real API call)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section-padding bg-hype-cream">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-hype-brown px-8 py-14 md:px-16 text-center"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-hype-dark/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-hype-sand/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="inline-block bg-hype-sand/20 text-hype-sand font-display font-bold uppercase tracking-widest text-xs rounded-full px-4 py-2 mb-6">
              Nouveautés & offres
            </span>

            <h2 className="font-display font-black uppercase text-hype-cream leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Ne ratez aucune<br />nouveauté
            </h2>

            <p className="font-body text-hype-cream/70 mb-8">
              Soyez les premiers informés des nouvelles arrivées, des éditions limitées
              et des offres exclusives.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-hype-sand/30 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <p className="font-display font-bold uppercase text-hype-cream">
                  Inscription confirmée !
                </p>
                <p className="font-body text-hype-cream/70 text-sm">
                  Vous recevrez nos prochaines nouveautés par email.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className="flex-1 px-5 py-4 rounded-full bg-hype-cream text-hype-dark font-body text-sm focus:outline-none placeholder:text-hype-brown/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 bg-hype-dark text-hype-cream font-display font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-full hover:bg-hype-sand hover:text-hype-dark transition-all duration-300 active:scale-95 disabled:opacity-60 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  {status === "loading" ? "…" : "S'inscrire"}
                </button>
              </form>
            )}

            <p className="font-body text-hype-cream/40 text-xs mt-4">
              Pas de spam. Désinscription possible à tout moment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
