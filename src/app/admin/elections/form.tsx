import { useState } from "react";

export default function ElectionCreationForm({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const houses = ["Unity", "Faith", "Discipline", "Tolerance", "Headboy"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const house = formData.get("house") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const image = formData.get("image") as string;
    const participants = formData.get("participants") as string;

    // Validate all fields
    if (!name || !house || !startDate || !endDate || !image || !participants) {
      setError("All fields are mandatory, and an image URL is required.");
      return;
    }

    setLoading(true);
    try {
      // Simulate form submission (Replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      e.currentTarget.reset(); // Clear the form
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setError("An error occurred while creating the election.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-slate-900/90 bg-opacity-75 flex items-center justify-center z-50 transition-all ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="p-6 rounded shadow-md w-full max-w-lg relative text-black">
        <button className="absolute top-4 right-4 " onClick={toggleModal}>
          &times;
        </button>

        <h1 className="text-xl font-semibold mb-4 text-center text-white">
          Create New Election
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 mb-4 text-center">
            Election created successfully!
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Election Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded p-2 outline-none"
              placeholder="Enter election name"
              required
            />
          </div>

          {/* House */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              House
            </label>
            <select name="house" className="w-full border rounded p-2" required>
              <option value="" disabled>
                Select a house
              </option>
              {houses.map((house) => (
                <option key={house} value={house}>
                  {house}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white ">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              className="w-full border rounded p-2 outline-none"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Participants IDs */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Participants IDs
            </label>
            <input
              type="text"
              name="participants"
              className="w-full border rounded p-2 outline-none"
              placeholder="Enter participants' IDs separated by commas"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-green-600 text-white rounded p-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Election"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
