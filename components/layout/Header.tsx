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

export function Header() {
  const isScrolled = useScrollHeader(80);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCartStore();
  const count = itemCount();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-hype-cream/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-hype-sand flex items-center justify-center overflow-hidden border-2 border-hype-cream shadow-card group-hover:shadow-card-hover transition-shadow">
                <span className="font-display font-black text-hype-cream text-xs leading-none text-center">
                  HM
                </span>
              </div>
              <span
                className={cn(
                  "font-display font-black uppercase tracking-tight text-lg transition-colors duration-300",
                  isScrolled ? "text-hype-dark" : "text-hype-dark"
                )}
              >
                Hype Market
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body font-medium text-sm transition-colors duration-200 hover:text-hype-brown",
                    isScrolled ? "text-hype-dark" : "text-hype-dark"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <Link
                href="/panier"
                className="relative p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
                aria-label="Mon panier"
              >
                <ShoppingBag
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isScrolled ? "text-hype-dark" : "text-hype-dark"
                  )}
                />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hype-brown text-hype-cream text-xs font-display font-bold flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
                aria-label="Menu"
              >
                <Menu
                  className={cn(
                    "w-6 h-6",
                    isScrolled ? "text-hype-dark" : "text-hype-dark"
                  )}
                />
              </button>
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
