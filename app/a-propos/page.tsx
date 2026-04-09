import { Metadata } from "next";
import { Globe, Star, Heart, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire de Hype Market, épicerie internationale à Nice. Notre passion pour les saveurs du monde.",
};

const values = [
  {
    icon: Globe,
    title: "Authenticité",
    description:
      "Chaque produit est importé directement depuis son pays d'origine pour garantir une expérience gustative authentique.",
  },
  {
    icon: Star,
    title: "Qualité",
    description:
      "Nous sélectionnons rigoureusement chaque article pour sa qualité, son goût et son unicité sur le marché français.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Hype Market est né d'une vraie passion pour la découverte culinaire et le partage des cultures du monde.",
  },
  {
    icon: MapPin,
    title: "Communauté",
    description:
      "Installés à Nice, nous servons notre communauté locale avec des produits que vous ne trouverez nulle part ailleurs.",
  },
];

const regions = [
  { flag: "🇯🇵", name: "Japon", products: "Pocky, Kit Kat Matcha, Ramune, Calbee…" },
  { flag: "🇲🇽", name: "Mexique", products: "Takis, Valentina, Tajín, Sabritas…" },
  { flag: "🇦🇪", name: "Dubaï", products: "Arabian Sweet, Dubai Chocolate…" },
  { flag: "🇺🇸", name: "États-Unis", products: "Cheetos, Warheads, Jolly Rancher…" },
  { flag: "🇰🇷", name: "Corée du Sud", products: "Samyang, Shin Ramyun, Pepero…" },
  { flag: "🇹🇼", name: "Taïwan", products: "Mogu Mogu, Boba Milk Tea…" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hype-light pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-hype-cream to-hype-sand/30 py-24">
        <div className="section-container text-center">
          <span className="font-display font-bold uppercase tracking-widest text-hype-brown text-xs">
            Notre histoire
          </span>
          <h1
            className="font-display font-black uppercase text-hype-dark mt-4 mb-6 leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            Une épicerie,<br />tout un monde
          </h1>
          <p className="font-body text-hype-brown text-lg max-w-2xl mx-auto">
            Hype Market est né d&apos;une passion pour les saveurs qui voyagent. Basés à Nice,
            nous vous proposons une sélection unique de produits importés des quatre coins du globe.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-hype-light">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-black uppercase text-hype-dark text-3xl md:text-4xl mb-6 leading-tight">
                Comment tout a commencé
              </h2>
              <div className="space-y-4 font-body text-hype-dark/80 leading-relaxed">
                <p>
                  Tout a commencé avec une obsession simple : trouver ces produits viraux
                  qu&apos;on voit partout sur les réseaux sociaux mais qu&apos;on ne trouve nulle part
                  en France. Le Dubai Chocolate, les Takis Fuego, le Ramune japonais…
                </p>
                <p>
                  Plutôt que d&apos;attendre que quelqu&apos;un les importe, nous avons décidé de
                  le faire nous-mêmes. Hype Market a ouvert ses portes à Nice avec une
                  mission claire : apporter le monde à votre quartier.
                </p>
                <p>
                  Aujourd&apos;hui nous proposons plus de 200 références venues de 20+ pays,
                  renouvelées régulièrement au gré des tendances et de vos demandes.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["🍫", "🥤", "🌶️", "🍬", "🍟", "🍪"].map((emoji, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-hype-cream flex items-center justify-center text-5xl shadow-card"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-hype-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display font-black uppercase text-hype-dark text-4xl">
              Nos valeurs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-hype-light rounded-2xl p-6 shadow-card"
              >
                <div className="w-12 h-12 rounded-full bg-hype-sand/30 flex items-center justify-center mb-4">
                  <val.icon className="w-6 h-6 text-hype-brown" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-tight text-hype-dark text-lg mb-2">
                  {val.title}
                </h3>
                <p className="font-body text-hype-brown/80 text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="section-padding bg-hype-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display font-black uppercase text-hype-cream text-4xl">
              Les origines
            </h2>
            <p className="font-body text-hype-cream/60 mt-4">
              Des produits sélectionnés aux quatre coins du globe.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((r) => (
              <div
                key={r.name}
                className="bg-hype-brown/20 rounded-2xl p-5 flex items-start gap-4"
              >
                <span className="text-3xl">{r.flag}</span>
                <div>
                  <p className="font-display font-bold text-hype-cream uppercase tracking-wide">
                    {r.name}
                  </p>
                  <p className="font-body text-hype-cream/60 text-sm mt-1">
                    {r.products}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit us */}
      <section className="section-padding bg-hype-cream">
        <div className="section-container text-center">
          <h2 className="font-display font-black uppercase text-hype-dark text-4xl mb-6">
            Venez nous rendre visite
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            <div className="flex items-center gap-3 text-hype-brown font-body">
              <MapPin className="w-5 h-5" />
              <span>22 Rue Bottero, 06000 Nice</span>
            </div>
            <div className="flex items-center gap-3 text-hype-brown font-body">
              <Clock className="w-5 h-5" />
              <span>Lun – Dim : 15h00 – 23h00</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button variant="primary">Explorer le catalogue</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Nous contacter</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
