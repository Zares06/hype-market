"use client";

import { Suspense } from "react";
import { useFilterState } from "@/hooks/useFilterState";
import { PRODUCTS } from "@/lib/data/products";
import { filterProducts } from "@/lib/utils/filterProducts";
import { FilterSidebar } from "@/components/catalogue/FilterSidebar";
import { MobileFilterSheet } from "@/components/catalogue/MobileFilterSheet";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { SortDropdown } from "@/components/catalogue/SortDropdown";

function CatalogueContent() {
  const { filters, setFilters, resetFilters, activeCount } = useFilterState();
  const filtered = filterProducts(PRODUCTS, filters);

  return (
    <div className="min-h-screen bg-hype-light pt-20">
      {/* Header */}
      <div className="bg-hype-cream border-b border-hype-sand/30">
        <div className="section-container py-10">
          <h1 className="font-display font-black uppercase tracking-tight text-hype-dark text-4xl md:text-5xl mb-2">
            Catalogue
          </h1>
          <p className="font-body text-hype-brown">
            Snacks, boissons et spécialités du monde entier
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="section-container py-10">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilter={setFilters}
            onReset={resetFilters}
            activeCount={activeCount}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <MobileFilterSheet
                filters={filters}
                onFilter={setFilters}
                onReset={resetFilters}
                activeCount={activeCount}
              />
              <div className="flex items-center gap-3 ml-auto">
                <span className="font-body text-hype-brown text-sm hidden sm:block">
                  Trier par :
                </span>
                <SortDropdown
                  value={filters.sortBy}
                  onChange={(sortBy) => setFilters({ sortBy })}
                />
              </div>
            </div>

            {/* Mobile search */}
            <div className="lg:hidden mb-4">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                placeholder="Rechercher un produit…"
                className="w-full px-4 py-3 rounded-xl border border-hype-sand/50 bg-hype-cream text-hype-dark font-body text-sm focus:outline-none focus:border-hype-brown placeholder:text-hype-brown/40 transition-colors"
              />
            </div>

            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20" />}>
      <CatalogueContent />
    </Suspense>
  );
}
