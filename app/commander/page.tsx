"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ChevronLeft, Truck, Store } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  deliveryOption: z.enum(["pickup", "delivery"]),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const DELIVERY_OPTIONS = [
  {
    id: "pickup" as const,
    icon: Store,
    label: "Retrait en magasin",
    description: "22 Rue Bottero, Nice — Gratuit",
    price: 0,
  },
  {
    id: "delivery" as const,
    icon: Truck,
    label: "Livraison à domicile",
    description: "Nice et alentours — délai 24h",
    price: 4.9,
  },
];

export default function CommanderPage() {
  const { items, total } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartTotal = total();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { deliveryOption: "pickup" },
  });

  const deliveryOption = watch("deliveryOption");
  const deliveryPrice =
    DELIVERY_OPTIONS.find((o) => o.id === deliveryOption)?.price ?? 0;
  const grandTotal = cartTotal + deliveryPrice;

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          customer: data,
          deliveryPrice,
        }),
      });

      const json = await res.json();

      if (json.url) {
        // Redirect to Stripe Checkout
        window.location.href = json.url;
      } else {
        setError(json.error || "Une erreur est survenue.");
      }
    } catch {
      setError("Impossible de traiter la commande. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-hype-light pt-20 flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="text-6xl">🛒</div>
        <h1 className="font-display font-black uppercase text-hype-dark text-3xl">
          Panier vide
        </h1>
        <p className="font-body text-hype-brown">
          Ajoutez des produits avant de commander.
        </p>
        <Link href="/catalogue">
          <Button variant="primary">Explorer le catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hype-light pt-20">
      <div className="section-container py-10">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1 text-sm font-body text-hype-brown hover:text-hype-dark transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux achats
        </Link>

        <h1 className="font-display font-black uppercase tracking-tight text-hype-dark text-4xl mb-10">
          Commander
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-[1fr_400px] gap-10"
        >
          {/* Left - Form */}
          <div className="space-y-8">
            {/* Delivery choice */}
            <div>
              <h2 className="font-display font-bold uppercase tracking-wide text-hype-dark text-lg mb-4">
                Mode de livraison
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {DELIVERY_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                      deliveryOption === opt.id
                        ? "border-hype-brown bg-hype-cream"
                        : "border-hype-sand/50 bg-hype-cream/50 hover:border-hype-sand"
                    )}
                  >
                    <input
                      type="radio"
                      value={opt.id}
                      {...register("deliveryOption")}
                      className="sr-only"
                    />
                    <opt.icon
                      className={cn(
                        "w-5 h-5 mt-0.5",
                        deliveryOption === opt.id
                          ? "text-hype-brown"
                          : "text-hype-sand"
                      )}
                    />
                    <div>
                      <p className="font-display font-bold text-hype-dark text-sm uppercase">
                        {opt.label}
                      </p>
                      <p className="font-body text-hype-brown/70 text-xs mt-0.5">
                        {opt.description}
                      </p>
                      <p className="font-display font-bold text-hype-brown text-sm mt-1">
                        {opt.price === 0 ? "Gratuit" : formatPrice(opt.price)}
                      </p>
                    </div>
                    {deliveryOption === opt.id && (
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-hype-brown" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="font-display font-bold uppercase tracking-wide text-hype-dark text-lg mb-4">
                Vos coordonnées
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "firstName" as const, label: "Prénom", placeholder: "Marie" },
                  { name: "lastName" as const, label: "Nom", placeholder: "Dupont" },
                  { name: "email" as const, label: "Email", placeholder: "marie@exemple.fr", type: "email", full: true },
                  { name: "phone" as const, label: "Téléphone", placeholder: "+33 6 xx xx xx xx", type: "tel" },
                ].map((field) => (
                  <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
                    <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      {...register(field.name)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-hype-cream font-body text-sm text-hype-dark focus:outline-none transition-colors placeholder:text-hype-brown/40",
                        errors[field.name]
                          ? "border-hype-error"
                          : "border-hype-sand/50 focus:border-hype-brown"
                      )}
                    />
                    {errors[field.name] && (
                      <p className="text-hype-error text-xs mt-1 font-body">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address (if delivery chosen) */}
            {deliveryOption === "delivery" && (
              <div>
                <h2 className="font-display font-bold uppercase tracking-wide text-hype-dark text-lg mb-4">
                  Adresse de livraison
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      placeholder="12 avenue de la mer"
                      {...register("address")}
                      className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream font-body text-sm text-hype-dark focus:outline-none focus:border-hype-brown transition-colors placeholder:text-hype-brown/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                        Code postal
                      </label>
                      <input
                        type="text"
                        placeholder="06000"
                        {...register("postalCode")}
                        className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream font-body text-sm text-hype-dark focus:outline-none focus:border-hype-brown transition-colors placeholder:text-hype-brown/40"
                      />
                    </div>
                    <div>
                      <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        placeholder="Nice"
                        {...register("city")}
                        className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream font-body text-sm text-hype-dark focus:outline-none focus:border-hype-brown transition-colors placeholder:text-hype-brown/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2">
                Note (optionnel)
              </label>
              <textarea
                rows={3}
                placeholder="Instructions particulières…"
                {...register("notes")}
                className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream font-body text-sm text-hype-dark focus:outline-none focus:border-hype-brown transition-colors placeholder:text-hype-brown/40 resize-none"
              />
            </div>
          </div>

          {/* Right - Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-hype-cream rounded-3xl p-6 shadow-card">
              <h2 className="font-display font-black uppercase tracking-tight text-hype-dark text-xl mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-hype-sand/30 flex items-center justify-center text-xl shrink-0">
                      {item.product.originFlag}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-hype-dark text-sm leading-tight truncate">
                        {item.product.name}
                      </p>
                      <p className="font-body text-hype-brown text-xs">
                        × {item.quantity}
                      </p>
                    </div>
                    <p className="font-display font-bold text-hype-dark text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-hype-sand/30 pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm text-hype-brown">
                  <span>Sous-total ({count} articles)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-hype-brown">
                  <span>Livraison</span>
                  <span>
                    {deliveryPrice === 0 ? "Gratuit" : formatPrice(deliveryPrice)}
                  </span>
                </div>
                <div className="flex justify-between font-display font-black text-hype-dark text-xl pt-2 border-t border-hype-sand/30">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-hype-error font-body text-sm text-center">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Traitement…" : "Payer avec Stripe →"}
              </Button>

              <p className="text-center text-xs text-hype-brown/60 font-body mt-3">
                🔒 Paiement sécurisé par Stripe
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
