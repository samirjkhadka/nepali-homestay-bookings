"use client";
import { PROVINCES } from "@/types/others";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Filters({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();
  const searchParamObj = useSearchParams();

  const updateSearch = useDebouncedCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParamObj);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/search?${params.toString()}`);
    },
    500,
    {
      leading: true,
    }
  );
  return (
    <div className="space-y-6">
      <div className="">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Search Location
        </label>
        <input
          type="text"
          placeholder="Pokhara, Mustang..."
          className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          defaultValue={searchParams.q || ""}
          onChange={(e) => updateSearch("q", e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Province
        </label>
        <select
          name=""
          id=""
          className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All</option>
          {PROVINCES.map((province) => (
            <option value={province} key={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Price Range (NPR)
        </label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full px-4 py-2 rounded-lg border bg-background"
            defaultValue={searchParams.minPrice || ""}
            onChange={(e) => updateSearch("minPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full px-4 py-2 rounded-lg border bg-background"
            defaultValue={searchParams.maxPrice || ""}
            onChange={(e) => updateSearch("maxPrice", e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Guests
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg border bg-background"
          min="1"
          max="20"
          placeholder="Number of Agents"
          defaultValue={searchParams.guests || ""}
          onChange={(e) => updateSearch("guests", e.target.value)}
        />
      </div>
    </div>
  );
}
