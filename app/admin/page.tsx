// app/admin/page.tsx
import Link from "next/link";
import { BedDouble, Users, FileText, Video } from "lucide-react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login?redirect=/admin");
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-4">Admin Panel</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Manage listings, content, and users
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Link
            href="/admin/listings"
            className="bg-card border rounded-2xl p-8 text-center hover:shadow-xl transition"
          >
            <BedDouble className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Manage Listings</h2>
            <p className="text-muted-foreground">
              Add, edit, approve homestays
            </p>
          </Link>

          <Link
            href="/admin/blogs"
            className="bg-card border rounded-2xl p-8 text-center hover:shadow-xl transition"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Manage Blogs</h2>
            <p className="text-muted-foreground">Create travel stories</p>
          </Link>

          <Link
            href="/admin/videos"
            className="bg-card border rounded-2xl p-8 text-center hover:shadow-xl transition"
          >
            <Video className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">YouTube Videos</h2>
            <p className="text-muted-foreground">Add featured videos</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-card border rounded-2xl p-8 text-center hover:shadow-xl transition"
          >
            <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
            <p className="text-muted-foreground">View and manage accounts</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
