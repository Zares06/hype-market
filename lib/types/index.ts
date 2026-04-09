export type Region =
  | "asie"
  | "amerique-latine"
  | "afrique"
  | "moyen-orient"
  | "europe"
  | "amerique-nord";

export type ProductCategory =
  | "chocolat"
  | "snack"
  | "boisson"
  | "confiserie"
  | "biscuit"
  | "epice"
  | "sauce";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: ProductCategory;
  region: Region;
  originCountry: string;
  originFlag: string;
  description: string;
  ingredients?: string;
  weight?: string;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockCount?: number;
}

export interface WorldRegion {
  id: Region;
  nameFr: string;
  description: string;
  flag: string;
  coverImage: string;
  color: string;
}

export interface CategoryDef {
  id: ProductCategory;
  nameFr: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  region: Region | null;
  category: ProductCategory | null;
  priceMin: number;
  priceMax: number;
  sortBy: "price-asc" | "price-desc" | "newest" | "name-az";
  searchQuery: string;
  onlyNew: boolean;
  onlyInStock: boolean;
}

export interface DeliveryOption {
  id: "pickup" | "delivery";
  label: string;
  description: string;
  price: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryOption: DeliveryOption["id"];
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
}
