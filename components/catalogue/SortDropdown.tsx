"use client";

import { FilterState } from "@/lib/types";

const SORT_OPTIONS: { value: FilterState["sortBy"]; label: string }[] = [
  { value: "newest", label: "Nouveautés d'abord" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-az", label: "Nom A→Z" },
];

interface SortDropdownProps {
  value: FilterState["sortBy"];
  onChange: (value: FilterState["sortBy"]) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as FilterState["sortBy"])}
      className="px-4 py-2.5 rounded-xl border border-hype-sand/50 bg-hype-cream text-hype-dark font-body text-sm focus:outline-none focus:border-hype-brown transition-colors cursor-pointer"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
