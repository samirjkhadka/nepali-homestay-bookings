// app/search/Filters.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Safe handling — searchParams can be null on first load
  const current = new URLSearchParams(searchParams?.toString() || "");

  const handleChange = (key: string, value: string) => {
    if (value.trim()) {
      current.set(key, value.trim());
    } else {
      current.delete(key);
    }
    const query = current.toString();
    router.push(`/search${query ? `?${query}` : ""}`);
  };

  return (
    <div className="space-y-6 bg-card border rounded-xl p-6 sticky top-24">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>

      <div className="space-y-2">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          placeholder="Location, title..."
          value={searchParams?.get("q") || ""}
          onChange={(e) => handleChange("q", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="province">Province</Label>
        <Input
          id="province"
          placeholder="e.g., Bagmati"
          value={searchParams?.get("province") || ""}
          onChange={(e) => handleChange("province", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price (NPR)</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="From"
            value={searchParams?.get("minPrice") || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price (NPR)</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="To"
            value={searchParams?.get("maxPrice") || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Guests</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          placeholder="Number of guests"
          value={searchParams?.get("guests") || ""}
          onChange={(e) => handleChange("guests", e.target.value)}
        />
      </div>
    </div>
  );
}