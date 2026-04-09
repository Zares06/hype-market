import { Product, FilterState } from "@/lib/types";

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let result = [...products];

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.originCountry.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.region) {
    result = result.filter((p) => p.region === filters.region);
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.priceMax > 0) {
    result = result.filter((p) => p.price <= filters.priceMax);
  }

  if (filters.priceMin > 0) {
    result = result.filter((p) => p.price >= filters.priceMin);
  }

  if (filters.onlyNew) {
    result = result.filter((p) => p.isNew);
  }

  if (filters.onlyInStock) {
    result = result.filter((p) => p.inStock);
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
    default:
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
  }

  return result;
}
