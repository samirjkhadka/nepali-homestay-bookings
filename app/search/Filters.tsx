// app/search/Filters.tsx
"use client";

import { PROVINCES } from "@/types/others";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Filters({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();
  const searchParamsObj = useSearchParams();

  const updateSearch = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParamsObj);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  }, 300);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Search Location
        </label>
        <input
          type="text"
          placeholder="Bhaktapur, Pokhara..."
          defaultValue={searchParams.q || ""}
          onChange={(e) => updateSearch("q", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Province</label>
        <select
          defaultValue={searchParams.province || ""}
          onChange={(e) => updateSearch("province", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Provinces</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Price Range (NPR)
        </label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={searchParams.minPrice || ""}
            onChange={(e) => updateSearch("minPrice", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={searchParams.maxPrice || ""}
            onChange={(e) => updateSearch("maxPrice", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Guests</label>
        <input
          type="number"
          min="1"
          max="20"
          placeholder="Number of guests"
          defaultValue={searchParams.guests || ""}
          onChange={(e) => updateSearch("guests", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-background"
        />
      </div>
    </div>
  );
}
