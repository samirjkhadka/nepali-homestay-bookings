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
import { Users, Home, Edit, Eye } from "lucide-react";
import { ilike, eq, and } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

const Items_PER_PAGE = 10;
export default async function ManageListings({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    province?: string;
    district?: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const filterProvince = params.province || "";
  const filterDistrict = params.district || "";
  const filterType = params.type || "";

  let query = db.select().from(listings);
  if (search) {
    query = query.where(ilike(listings.title, search));
  }
  if (filterProvince) {
    query = query.where(eq(listings.province, filterProvince));
  }
  if (filterDistrict) {
    query = query.where(eq(listings.district, filterDistrict));
  }
  if (filterType) {
    query = query.where(eq(listings.type, filterType));
  }

  const allListings = await db.select().from(listings);

  const totalPages = Math.ceil(allListings.length / Items_PER_PAGE);

  const paginatedListings = allListings.slice(
    (page - 1) * Items_PER_PAGE,
    page * Items_PER_PAGE
  );

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const provinces = Array.from(
    new Set(allListings.map((l) => l.province))
  ).sort();
  const districts = Array.from(
    new Set(
      allListings
        .map((l) => {
          const match = l.location.match(/([^,]+),\s*([^,]+)/);
          return match ? match[2].trim() : null;
        })
        .filter(Boolean)
    )
  ).sort();

  // Generate pagination links
  const generatePageUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    if (search) urlParams.set("search", search);
    if (filterProvince) urlParams.set("province", filterProvince);
    if (filterDistrict) urlParams.set("district", filterDistrict);
    if (filterType) urlParams.set("type", filterType);
    if (newPage > 1) urlParams.set("page", newPage.toString());
    return `/admin/listings?${urlParams.toString()}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Listings</h1>
        <Link href="/admin/listings/new">
          <Button>Add New Listing</Button>
        </Link>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Search by title..."
          defaultValue={search}
          name="search"
          className="lg:col-span-2"
        />
        <Select defaultValue={filterProvince || "all"} name="province">
          <SelectTrigger>
            <SelectValue placeholder="All Provinces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Provinces</SelectItem>
            {provinces.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={filterDistrict} name="district">
          <SelectTrigger>
            <SelectValue placeholder="All Districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Districts</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={filterType} name="type">
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">S.N.</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Price (NPR)</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedListings.map((listing, index) => {
              const districtMatch =
                listing.location.match(/([^,]+),\s*([^,]+)/);
              const district = districtMatch ? districtMatch[2].trim() : "N/A";

              return (
                <tr
                  key={listing.id}
                  className="border-t hover:bg-muted/30 transition"
                >
                  <td className="p-4 text-center">
                    {(page - 1) * Items_PER_PAGE + index + 1}
                  </td>
                  <td className="p-4 font-medium">{listing.title}</td>
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
        <div className="border-t p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2 ">
            {prevPage && (
              <Link href={`/admin/listings?page=${prevPage}`}>
                <Button size="sm">Previous</Button>
              </Link>
            )}
            {nextPage && (
              <Link href={`/admin/listings?page=${nextPage}`}>
                <Button size="sm">Next</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
