"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FilterState, Region, ProductCategory } from "@/lib/types";

const DEFAULT_FILTERS: FilterState = {
  region: null,
  category: null,
  priceMin: 0,
  priceMax: 0,
  sortBy: "newest",
  searchQuery: "",
  onlyNew: false,
  onlyInStock: false,
};

export function useFilterState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: FilterState = useMemo(() => {
    return {
      region: (searchParams.get("region") as Region) || null,
      category: (searchParams.get("category") as ProductCategory) || null,
      priceMin: Number(searchParams.get("priceMin")) || 0,
      priceMax: Number(searchParams.get("priceMax")) || 0,
      sortBy:
        (searchParams.get("sortBy") as FilterState["sortBy"]) || "newest",
      searchQuery: searchParams.get("q") || "",
      onlyNew: searchParams.get("onlyNew") === "true",
      onlyInStock: searchParams.get("onlyInStock") === "true",
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (updates: Partial<FilterState>) => {
      const newFilters = { ...filters, ...updates };
      const params = new URLSearchParams();

      if (newFilters.region) params.set("region", newFilters.region);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.priceMin > 0) params.set("priceMin", String(newFilters.priceMin));
      if (newFilters.priceMax > 0) params.set("priceMax", String(newFilters.priceMax));
      if (newFilters.sortBy !== "newest") params.set("sortBy", newFilters.sortBy);
      if (newFilters.searchQuery) params.set("q", newFilters.searchQuery);
      if (newFilters.onlyNew) params.set("onlyNew", "true");
      if (newFilters.onlyInStock) params.set("onlyInStock", "true");

      const queryString = params.toString();
      router.push(`/catalogue${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [filters, router]
  );

  const resetFilters = useCallback(() => {
    router.push("/catalogue", { scroll: false });
  }, [router]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.region) count++;
    if (filters.category) count++;
    if (filters.priceMin > 0 || filters.priceMax > 0) count++;
    if (filters.onlyNew) count++;
    if (filters.onlyInStock) count++;
    return count;
  }, [filters]);

  return { filters, setFilters, resetFilters, activeCount };
}
