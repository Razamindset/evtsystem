import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/user.model";
import Users from "./users";

async function fetchAllUsers() {
  await dbConnect();
  const users = await User.find().lean();
  return JSON.parse(JSON.stringify(users));
}

export default async function CreateUsersPage() {
  const users = await fetchAllUsers();
  return (
    <div className="bg-gray-900 text-white w-full h-full rounded-md p-4">
      <Users users={users} />
    </div>
  );
}
