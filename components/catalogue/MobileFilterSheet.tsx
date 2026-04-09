"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { FilterState } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface MobileFilterSheetProps {
  filters: FilterState;
  onFilter: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  activeCount: number;
}

export function MobileFilterSheet({
  filters,
  onFilter,
  onReset,
  activeCount,
}: MobileFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-hype-sand/50 bg-hype-cream text-hype-dark font-body text-sm hover:border-hype-brown transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filtres
        {activeCount > 0 && (
          <span className="bg-hype-brown text-hype-cream text-xs rounded-full px-1.5 py-0.5 font-display font-bold">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-hype-dark"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-hype-light rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-hype-light pt-4 pb-2 px-6 flex items-center justify-between border-b border-hype-sand/20">
                <span className="font-display font-black uppercase text-hype-dark">Filtres</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-hype-sand/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {/* Inline filter content */}
                <div className="w-full">
                  <div className="bg-hype-cream rounded-2xl p-4">
                    <FilterSidebar
                      filters={filters}
                      onFilter={(updates) => {
                        onFilter(updates);
                      }}
                      onReset={onReset}
                      activeCount={activeCount}
                    />
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-hype-light px-6 pb-6 pt-4 border-t border-hype-sand/20">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Voir les résultats
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
