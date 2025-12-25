// app/admin/users/page.tsx
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";

export default async function ManageUsers() {
  const allUsers = await db.select().from(users);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Manage Users</h1>

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.first_name} {user.last_name}
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">{user.created_at?.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
