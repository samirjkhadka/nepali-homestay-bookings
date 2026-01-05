// app/admin/layout.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, BedDouble, FileText, Video, Users, LogOut } from "lucide-react";
import { getSession, logout } from "@/lib/auth";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/listings", label: "Manage Listings", icon: BedDouble },
  { href: "/admin/blogs", label: "Manage Blogs", icon: FileText },
  { href: "/admin/videos", label: "YouTube Videos", icon: Video },
  { href: "/admin/users", label: "Manage Users", icon: Users },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login?redirect=/admin");
  }

  // Fetch user info (you can extend users table with name if needed)
  // For now, show email
  const userEmail = session.email ;

  const handleLogout = async () => {
    "use server";
    await logout();
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r h-screen sticky top-0 flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-2 mb-8">
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

            {/* Logged in user */}
            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground mb-1">Logged in as</p>
              <p className="font-medium truncate">{userEmail}</p>
            </div>
          </div>

          {/* Logout */}
          <div className="p-6 border-t mt-auto">
            <form action={handleLogout}>
              <button
                type="submit"
                className="flex items-center gap-3 text-destructive hover:text-destructive/80 transition w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}