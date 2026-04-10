import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const footerLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const regionLinks = [
  { label: "Asie", href: "/catalogue?region=asie" },
  { label: "Moyen-Orient", href: "/catalogue?region=moyen-orient" },
  { label: "Amérique Latine", href: "/catalogue?region=amerique-latine" },
  { label: "Afrique", href: "/catalogue?region=afrique" },
  { label: "Europe", href: "/catalogue?region=europe" },
  { label: "Amériques du Nord", href: "/catalogue?region=amerique-nord" },
];

export function Footer() {
  return (
    <footer className="bg-hype-dark text-hype-cream">
      {/* Top band */}
      <div className="border-b border-hype-brown/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-hype-sand/30 flex-shrink-0">
                  <img
                    src="/images/logo.png"
                    alt="Hype Market"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "top" }}
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.style.display = "none";
                    }}
                  />
                </div>
                <span className="font-display font-black uppercase tracking-tight text-hype-cream text-lg">
                  Hype Market
                </span>
              </div>
              <p className="text-hype-cream/70 font-body text-sm leading-relaxed">
                Voyagez à travers les saveurs du monde. Snacks, boissons et spécialités
                internationales sélectionnés avec soin.
              </p>
              <a
                href="https://www.instagram.com/hypemarketnice"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-hype-sand hover:text-hype-cream transition-colors font-body text-sm"
              >
                <span className="text-base">📸</span>
                @hypemarketnice
              </a>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-display font-bold uppercase tracking-widest text-xs text-hype-sand mb-4">
                Pages
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-hype-cream/70 hover:text-hype-cream font-body text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Régions */}
            <div>
              <h4 className="font-display font-bold uppercase tracking-widest text-xs text-hype-sand mb-4">
                Régions
              </h4>
              <ul className="space-y-2">
                {regionLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-hype-cream/70 hover:text-hype-cream font-body text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Infos magasin */}
            <div>
              <h4 className="font-display font-bold uppercase tracking-widest text-xs text-hype-sand mb-4">
                Le Magasin
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-hype-cream/70 font-body text-sm">
                  <MapPin className="w-4 h-4 text-hype-sand shrink-0 mt-0.5" />
                  <span>22 Rue Bottero<br />06000 Nice</span>
                </div>
                <div className="flex items-start gap-2 text-hype-cream/70 font-body text-sm">
                  <Clock className="w-4 h-4 text-hype-sand shrink-0 mt-0.5" />
                  <span>Lundi – Dimanche<br />15h00 – 23h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-hype-cream/40 font-body text-xs">
            © {new Date().getFullYear()} Hype Market — Nice. Tous droits réservés.
          </p>
          <p className="text-hype-cream/40 font-body text-xs">
            Saveurs du monde entier 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
