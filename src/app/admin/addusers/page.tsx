import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/user.model";
import CreateUsersForm from "./users-form";

async function fetchAllUsers() {
  await dbConnect();
  const res = User.find();
  return res;
}

export default async function CreateUsersPage() {
  const users = await fetchAllUsers();
  console.log(users);
  return (
    <div className="bg-gray-900 text-white w-full h-full rounded-md p-4">
      <CreateUsersForm users={users} />
    </div>
  );
}
