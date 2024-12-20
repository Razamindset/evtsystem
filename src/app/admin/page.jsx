import { auth } from "@/auth";

export default async function AdminDashboardPage() {
  const session = await auth();
  console.log(session);

  return <div>{JSON.stringify(session, null, 2)}</div>;
}
