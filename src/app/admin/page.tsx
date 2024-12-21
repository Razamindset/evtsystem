import { auth } from "@/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
