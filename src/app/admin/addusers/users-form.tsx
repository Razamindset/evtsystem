"use client";

import { User } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";
import { FaAd, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

//First we need to enter the dtails of each student select house etc upload an image etc and crate teh user

export default function CreateUsersForm({ users }: { users: User[] }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    cnic: "",
    role: "",
    house: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    const errors: { [key: string]: string } = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.cnic.trim()) errors.cnic = "CNIC is required.";
    if (!data.role.trim()) errors.role = "Role is required.";
    if (!data.house.trim()) errors.house = "House is required.";

    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join("\n"));
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1>Add Users</h1>
        <div
          className="flex items-center gap-2
        "
        >
          <div>Count: {users.length}</div>
          <button
            className="flex items-center gap-2 bg-green-600 px-2 py-1 rounded-md"
            onClick={() => setOpen(!open)}
          >
            <FaPlus size={25} />
          </button>
        </div>
      </div>

      <div className="conatiner flex flex-col py-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* <Image
                  src={user.image}
                  alt={"User image"}
                  className="w-10 h-10 rounded-full"
                /> */}
                <div>
                  <h1>{user.name}</h1>
                  <p>{user.cnic}</p>
                </div>
              </div>
              <div>
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

      <div
        className={`fixed z-50 h-screen w-screen top-0 left-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">User Form</h2>
            <button onClick={() => setOpen(false)} className="text-white">
              <MdClose size={25} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="cnic"
              >
                CNIC
              </label>
              <input
                id="cnic"
                type="text"
                name="cnic"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="role"
              >
                Role
              </label>
              <input
                id="role"
                type="text"
                name="role"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                className="block text-sm text-gray-300 mb-1"
                htmlFor="house"
              >
                House
              </label>
              <input
                id="house"
                type="text"
                name="house"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
