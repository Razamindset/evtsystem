"use client";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link href="/" passHref>
          <button className="px-6 py-3 bg-green-600 transition text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}
