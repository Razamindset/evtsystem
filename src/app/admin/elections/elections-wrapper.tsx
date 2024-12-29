"use client";
import { ElectionTypes } from "@/lib/db/models/election.model";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import ElectionCreationForm from "./form";
import { useState } from "react";

export default function ElectionWrapper({
  elections,
}: {
  elections: ElectionTypes[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full h-full p-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">
            Current Elections ({elections?.length || 0})
          </h1>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            onClick={toggleModal}
          >
            Create <MdAdd size={30} />
          </button>
          <ElectionCreationForm isOpen={isOpen} toggleModal={toggleModal} />
        </div>

        {/* Elections List */}
        {elections && elections.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {elections.map((election, i) => (
              <Link href={`/admin/election/${election._id.toString()}`}>
                <div
                  className={
                    "border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  }
                  key={election._id.toString()}
                >
                  <img
                    src={election.image}
                    alt={election.name}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold">{election.name}</h3>
                  <p className="text-sm text-gray-600">
                    Start: {new Date(election.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    End: {new Date(election.endDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2>No elections currently available.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
