// app/admin/layout.tsx
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Home, BedDouble, FileText, Video, Users, LogOut } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/listings", label: "Manage Listings", icon: BedDouble },
  { href: "/admin/blogs", label: "Manage Blogs", icon: FileText },
  { href: "/admin/videos", label: "YouTube Videos", icon: Video },
  { href: "/admin/users", label: "Manage Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-card border-r h-screen sticky top-0">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
              <nav className="space-y-2">
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition"
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
              <Link
                href="/"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary"
              >
                <LogOut className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </SignedIn>
  );
}
