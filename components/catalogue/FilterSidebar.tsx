"use client";

import { WORLD_REGIONS } from "@/lib/data/regions";
import { CATEGORIES } from "@/lib/data/categories";
import { FilterState } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilter: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  activeCount: number;
}

export function FilterSidebar({
  filters,
  onFilter,
  onReset,
  activeCount,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-hype-cream rounded-2xl p-6 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-black uppercase tracking-tight text-hype-dark">
            Filtres
            {activeCount > 0 && (
              <span className="ml-2 bg-hype-brown text-hype-cream text-xs rounded-full px-2 py-0.5">
                {activeCount}
              </span>
            )}
          </h3>
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-hype-brown hover:text-hype-dark transition-colors font-body"
            >
              <X className="w-3 h-3" />
              Réinitialiser
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-2 block">
            Recherche
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilter({ searchQuery: e.target.value })}
            placeholder="Nom, marque, pays…"
            className="w-full px-3 py-2.5 rounded-xl border border-hype-sand/50 bg-hype-light text-hype-dark font-body text-sm focus:outline-none focus:border-hype-brown placeholder:text-hype-brown/40 transition-colors"
          />
        </div>

        {/* Région */}
        <div className="mb-6">
          <label className="font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-3 block">
            Région
          </label>
          <div className="space-y-1.5">
            <button
              onClick={() => onFilter({ region: null })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors",
                !filters.region
                  ? "bg-hype-brown text-hype-cream"
                  : "text-hype-dark hover:bg-hype-sand/30"
              )}
            >
              Toutes les régions
            </button>
            {WORLD_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() =>
                  onFilter({ region: filters.region === r.id ? null : r.id })
                }
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors flex items-center gap-2",
                  filters.region === r.id
                    ? "bg-hype-brown text-hype-cream"
                    : "text-hype-dark hover:bg-hype-sand/30"
                )}
              >
                <span>{r.flag}</span>
                {r.nameFr}
              </button>
            ))}
          </div>
        </div>

        {/* Catégorie */}
        <div className="mb-6">
          <label className="font-display font-bold uppercase tracking-widest text-xs text-hype-brown mb-3 block">
            Catégorie
          </label>
          <div className="space-y-1.5">
            <button
              onClick={() => onFilter({ category: null })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors",
                !filters.category
                  ? "bg-hype-brown text-hype-cream"
                  : "text-hype-dark hover:bg-hype-sand/30"
              )}
            >
              Toutes
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  onFilter({ category: filters.category === c.id ? null : c.id })
                }
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors flex items-center gap-2",
                  filters.category === c.id
                    ? "bg-hype-brown text-hype-cream"
                    : "text-hype-dark hover:bg-hype-sand/30"
                )}
              >
                <span>{c.icon}</span>
                {c.nameFr}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="font-display font-bold uppercase tracking-widest text-xs text-hype-brown block">
            Options
          </label>
          {[
            { key: "onlyNew" as const, label: "Nouveautés uniquement" },
            { key: "onlyInStock" as const, label: "En stock uniquement" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={(e) => onFilter({ [key]: e.target.checked })}
                className="w-4 h-4 rounded border-hype-sand accent-hype-brown cursor-pointer"
              />
              <span className="font-body text-sm text-hype-dark group-hover:text-hype-brown transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
