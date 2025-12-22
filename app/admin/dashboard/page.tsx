

export default function AdminDashboard() {
  // const { user } = useUser();

  // if (!user?.publicMetadata?.role === "admin") {
  //   return (
  //     <div className="container mx-auto px-4 py-20 text-center">
  //       <h1 className="text-4xl font-bold">Access Denied</h1>
  //       <p className="text-xl text-muted-foreground mt-4">Admin access only</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Total Listings</h2>
            <p className="text-4xl font-bold">2</p>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
            <p className="text-4xl font-bold">156</p>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Pending Bookings</h2>
            <p className="text-4xl font-bold">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
