"use client";

import { User } from "next-auth";
import UserForm from "./form";
import Image from "next/image";

export default function FormWrapper({ users }: { users: User[] }) {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1>Add Users</h1>
        <div
          className="flex items-center gap-2
        "
        >
          <div>Count: {users.length}</div>
          <UserForm />
        </div>
      </div>

      <div className="conatiner flex flex-col py-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={user.image ?? "https://dummyimage.com/50X50"}
                  alt={"User image"}
                  className="w-10 h-10 rounded-full"
                  width={50}
                  height={50}
                />
                <div>
                  <h1>{user.name}</h1>
                  <p>{user.cnic}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                  Edit
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No users</div>
        )}
      </div>
    </div>
  );
}
