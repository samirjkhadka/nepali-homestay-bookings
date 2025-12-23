// app/search/page.tsx
import { Suspense } from "react";
import Filters from "./Filters";
import SearchResults from "./SearchResults";
import SearchSkeleton from "./SearchSkeleton";
import { searchListings } from "@/lib/db/queries/search";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const province = params.province || "";
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const guests = params.guests ? Number(params.guests) : undefined;

  const initialResults = await searchListings({
    q,
    province,
    minPrice,
    maxPrice,
    guests,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Find Your Perfect Homestay</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Filters searchParams={params} />
          </aside>

          <section className="lg:col-span-3">
            <Suspense fallback={<SearchSkeleton />}>
              <SearchResults initialResults={initialResults} searchParams={params} />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}