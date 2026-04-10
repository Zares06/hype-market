"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/catalogue?region=asie", label: "Asie" },
  { href: "/catalogue?region=amerique-latine", label: "Amériques" },
  { href: "/catalogue?region=moyen-orient", label: "Moyen-Orient" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const FLAG_STRIP = [
  { flag: "🇯🇵", name: "Japon" },
  { flag: "🍫", name: "Dubai Choco" },
  { flag: "🇲🇽", name: "Mexique" },
  { flag: "🥤", name: "Boissons" },
  { flag: "🇦🇪", name: "Dubaï" },
  { flag: "🌶️", name: "Épicé" },
  { flag: "🇺🇸", name: "États-Unis" },
  { flag: "🍬", name: "Confiserie" },
  { flag: "🇰🇷", name: "Corée" },
  { flag: "🍟", name: "Snacks" },
  { flag: "🇹🇭", name: "Thaïlande" },
  { flag: "🍪", name: "Biscuits" },
  { flag: "🇩🇪", name: "Allemagne" },
  { flag: "🫙", name: "Sauces" },
  { flag: "🇹🇼", name: "Taïwan" },
  { flag: "🇧🇪", name: "Belgique" },
];

function LogoBadge({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-9 h-9 md:w-10 md:h-10",
    md: "w-12 h-12",
    lg: "w-20 h-20 md:w-24 md:h-24",
  };

  return (
    <div
      className={cn(
        sizes[size],
        "rounded-full overflow-hidden border-2 border-hype-sand/50 shadow-card flex-shrink-0"
      )}
    >
      <img
        src="/images/logo.png"
        alt="Hype Market"
        className="w-full h-full object-cover"
        style={{ objectPosition: "top" }}
        onError={(e) => {
          // Fallback HM badge si le logo n'est pas encore uploadé
          const t = e.currentTarget as HTMLImageElement;
          t.style.display = "none";
          const parent = t.parentElement;
          if (parent) {
            parent.style.background = "#8B6145";
            parent.innerHTML =
              '<span style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#F5EDD8;font-family:serif;font-weight:900;font-size:10px;letter-spacing:0.1em">HM</span>';
          }
        }}
      />
    </div>
  );
}

export { LogoBadge };

export function Header() {
  const isScrolled = useScrollHeader(80);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCartStore();
  const count = itemCount();
  const repeated = [...FLAG_STRIP, ...FLAG_STRIP];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ── Bande drapeaux / produits ── */}
        <div className="bg-hype-dark h-8 overflow-hidden flex items-center">
          <div className="flex animate-marquee whitespace-nowrap">
            {repeated.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 mx-4 text-hype-cream/80 font-display font-bold uppercase tracking-widest text-[10px]"
              >
                <span className="text-base leading-none">{item.flag}</span>
                {item.name}
                <span className="text-hype-sand/40 mx-1">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Navigation principale ── */}
        <div
          className={cn(
            "transition-all duration-500",
            isScrolled
              ? "bg-hype-cream/95 backdrop-blur-md shadow-sm"
              : "bg-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-12 md:h-14">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <LogoBadge size="sm" />
                <div className="flex flex-col leading-none">
                  <span
                    className={cn(
                      "font-display font-black uppercase tracking-tight text-base transition-colors duration-300",
                      isScrolled ? "text-hype-dark" : "text-hype-dark"
                    )}
                  >
                    Hype Market
                  </span>
                  <span className="text-[9px] tracking-widest text-hype-brown font-display uppercase hidden sm:block">
                    Épicerie Internationale
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body font-medium text-sm text-hype-dark transition-colors duration-200 hover:text-hype-brown"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Right */}
              <div className="flex items-center gap-2">
                <Link
                  href="/panier"
                  className="relative p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
                  aria-label="Mon panier"
                >
                  <ShoppingBag className="w-5 h-5 text-hype-dark" />
                  {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-hype-brown text-hype-cream text-[10px] font-display font-bold flex items-center justify-center">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5 text-hype-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
