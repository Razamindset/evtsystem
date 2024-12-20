"use client";

import { singIn } from "@/actions/user/signin.action";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignInForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const cnic = formData.get("cnic") as string;
    const password = formData.get("password") as string;

    try {
      if (!cnic || !password) {
        throw new Error("Please fill in both fields");
      }

      console.log("CNIC:", cnic);
      console.log("Password:", password);

      const result = await singIn({
        cnic,
        password,
      });

      console.log(result);

      if (result.success) {
        console.log("Login successfull");
        router.push("/admin");
        return;
      }

      console.log("Login failed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Sign In To APS EVS
        </h2>

        <div className="mb-4">
          <label
            htmlFor="cnic"
            className="block text-sm font-medium text-text-primary"
          >
            CNIC
          </label>
          <input
            type="text"
            name="cnic"
            id="cnic"
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-primary"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-primary-green text-white font-semibold rounded-md bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-primary-green focus:outline-none"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
