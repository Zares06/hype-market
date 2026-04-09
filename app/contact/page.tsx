"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message trop court"),
});

type FormData = z.infer<typeof schema>;

const STORE_INFO = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["22 Rue Bottero", "06000 Nice"],
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Lundi – Dimanche", "15h00 – 23h00"],
  },
  {
    icon: MapPin,
    title: "Instagram",
    lines: ["@hypemarketnice"],
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        reset();
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
    } catch {
      setError("Impossible d'envoyer le message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hype-light pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-hype-cream to-hype-sand/20 py-16">
        <div className="section-container text-center">
          <h1 className="font-display font-black uppercase text-hype-dark text-4xl md:text-5xl mb-4">
            Contact
          </h1>
          <p className="font-body text-hype-brown text-lg">
            Une question, une suggestion ? On vous répond vite.
          </p>
        </div>
      </div>

      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display font-black uppercase text-hype-dark text-2xl mb-8">
              Envoyer un message
            </h2>

            {sent ? (
              <div className="bg-hype-success/10 border border-hype-success/30 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-display font-bold uppercase text-hype-success text-xl mb-2">
                  Message envoyé !
                </h3>
                <p className="font-body text-hype-dark/70">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-body text-sm text-hype-brown hover:text-hype-dark transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      {...register("name")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-hype-cream font-body text-sm text-hype-dark focus:outline-none transition-colors placeholder:text-hype-brown/40",
                        errors.name
                          ? "border-hype-error"
                          : "border-hype-sand/50 focus:border-hype-brown"
                      )}
                    />
                    {errors.name && (
                      <p className="text-hype-error text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="vous@exemple.fr"
                      {...register("email")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-hype-cream font-body text-sm text-hype-dark focus:outline-none transition-colors placeholder:text-hype-brown/40",
                        errors.email
                          ? "border-hype-error"
                          : "border-hype-sand/50 focus:border-hype-brown"
                      )}
                    />
                    {errors.email && (
                      <p className="text-hype-error text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                    Sujet (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Commande, produit, partenariat…"
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream font-body text-sm text-hype-dark focus:outline-none focus:border-hype-brown transition-colors placeholder:text-hype-brown/40"
                  />
                </div>

                <div>
                  <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Votre message…"
                    {...register("message")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-hype-cream font-body text-sm text-hype-dark focus:outline-none transition-colors placeholder:text-hype-brown/40 resize-none",
                      errors.message
                        ? "border-hype-error"
                        : "border-hype-sand/50 focus:border-hype-brown"
                    )}
                  />
                  {errors.message && (
                    <p className="text-hype-error text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-hype-error text-sm font-body text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Envoi en cours…" : "Envoyer le message"}
                </Button>
              </form>
            )}
          </div>

          {/* Store info */}
          <div className="space-y-6">
            <div className="bg-hype-cream rounded-3xl p-8 shadow-card">
              <h3 className="font-display font-black uppercase text-hype-dark text-xl mb-6">
                Hype Market
              </h3>
              <div className="space-y-5">
                {STORE_INFO.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-hype-sand/30 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-hype-brown" />
                    </div>
                    <div>
                      <p className="font-display font-bold uppercase tracking-wide text-hype-dark text-xs mb-1">
                        {info.title}
                      </p>
                      {info.lines.map((line, i) => (
                        <p key={i} className="font-body text-hype-brown text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-card h-64 bg-hype-sand/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.1!2d7.268!3d43.7102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cddabc3d3d3d3d%3A0x0!2s22+Rue+Bottero%2C+06000+Nice!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hype Market — 22 Rue Bottero, Nice"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
