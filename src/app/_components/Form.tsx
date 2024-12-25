"use client";

import { singIn } from "@/actions/user/signin.action";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const cnic = formData.get("cnic") as string;

    try {
      if (!cnic) {
        throw new Error("Please fill in the CNIC field.");
      }

      const result = await singIn({ cnic });

      if (result.success) {
        router.push("/admin");
        return;
      }

      setError(result.message || "Login failed. Please try again.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign In</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
      )}

      <div className="mb-4">
        <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-2">
          CNIC
        </label>
        <input
          type="text"
          name="cnic"
          id="cnic"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your CNIC"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

