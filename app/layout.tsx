import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hype Market — Épicerie internationale à Nice",
    template: "%s | Hype Market",
  },
  description:
    "Découvrez une sélection unique de snacks, boissons et spécialités du monde entier. Dubai Chocolate, Takis, Ramune et bien plus. 22 Rue Bottero, Nice.",
  keywords: [
    "épicerie internationale",
    "snacks importés",
    "Dubai chocolate",
    "produits monde",
    "Nice",
    "Takis",
    "Ramune",
    "épicerie exotique",
  ],
  openGraph: {
    siteName: "Hype Market",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body bg-hype-light text-hype-dark antialiased">
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
