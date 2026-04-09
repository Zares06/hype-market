"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-hype-dark/50 backdrop-blur-sm"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-hype-cream flex flex-col shadow-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-hype-sand/30">
              <span className="font-display font-black uppercase tracking-tight text-hype-dark text-lg">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
              >
                <X className="w-5 h-5 text-hype-dark" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 p-6 flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 px-4 rounded-xl font-body font-medium text-hype-dark hover:bg-hype-sand/30 hover:text-hype-brown transition-colors text-lg"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-hype-sand/30">
              <p className="text-sm text-hype-brown font-body">
                Lun–Dim • 15h00 – 23h00
              </p>
              <p className="text-sm text-hype-brown/70 font-body mt-1">
                22 Rue Bottero, 06000 Nice
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
