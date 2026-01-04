// app/admin/listings/page.tsx
import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Eye, Home, Users } from "lucide-react";
import { desc } from "drizzle-orm";

const ITEMS_PER_PAGE = 10;

export default async function ManageListings({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const allListings = await db
    .select()
    .from(listings)
    .orderBy(desc(listings.created_at));

  const totalPages = Math.ceil(allListings.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedListings = allListings.slice(start, end);

  const generatePageUrl = (page: number) => `/admin/listings?page=${page}`;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Manage Listings ({allListings.length})
        </h1>
        <Link href="/admin/listings/new">
          <Button>Add New Listing</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 w-16">S.N.</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Province</th>
                <th className="text-left p-4">District</th>
                <th className="text-left p-4">Price (NPR)</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedListings.map((listing, index) => {
                const districtMatch = listing.location.match(/([^,]+),\s*([^,]+)/);
                const district = districtMatch ? districtMatch[2].trim() : "N/A";

                return (
                  <tr key={listing.id} className="border-t hover:bg-muted/30 transition">
                    <td className="p-4 text-center">{start + index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {listing.homestay_type === "community" ? (
                          <>
                            <Users className="w-4 h-4 text-primary" />
                            <span>Community</span>
                          </>
                        ) : (
                          <>
                            <Home className="w-4 h-4 text-primary" />
                            <span>Individual</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{listing.title}</td>
                    <td className="p-4">{listing.province}</td>
                    <td className="p-4">{district}</td>
                    <td className="p-4 font-semibold">NPR {listing.price_npr}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          listing.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : listing.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {(listing.status || "pending").toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <TooltipProvider>
                        <div className="flex items-center justify-center gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/admin/listings/${listing.id}/edit`}>
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/admin/listings/${listing.id}`}>
                                <Button variant="ghost" size="icon">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>View</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t p-4 flex items-center justify-between bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} ({allListings.length} total)
            </p>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link href={generatePageUrl(currentPage - 1)}>
                  <Button variant="outline" size="sm">Previous</Button>
                </Link>
              )}
              {currentPage < totalPages && (
                <Link href={generatePageUrl(currentPage + 1)}>
                  <Button variant="outline" size="sm">Next</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}