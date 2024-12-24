import { createUser } from "@/actions/admin/create-user.action";
import { UploadButton } from "@/lib/utils/uploadthing";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export default function UserForm({ initialData }: UserFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!data.name.trim()) newErrors.name = "Name is required.";
    if (!data.cnic.trim()) newErrors.cnic = "CNIC is required.";
    if (!data.role) newErrors.role = "Role is required.";
    if (!data.house) newErrors.house = "House is required.";
    if (!imagePreview) newErrors.image = "Image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const payload: UserCreationActionPaload = {
      name: data.name,
      cnic: data.cnic,
      house: data.house as UserCreationActionPaload["house"],
      role: data.role as UserCreationActionPaload["role"],
      image: imagePreview,
    };

    try {
      const res = await createUser(payload);
      if (!res.success) {
        setErrors({
          actionError: res.message || "Failed to create user. Try again later.",
        });
        setMessage(null);
      } else {
        setMessage(res.message);
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      setErrors({
        actionError: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        <MdAdd size={35} />
      </button>
      <div
        className={`form-wrapper flex items-center justify-center bg-slate-900/90 fixed top-0 left-0 right-0 bottom-0 h-screen w-screen transition ${
          open ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="top-5 right-5 absolute"
        >
          <MdClose size={35} />
        </button>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-[25rem] text-black"
        >
          {/* Display Success or Error Message */}
          {isLoading && <div className="loading-spinner"></div>}
          {errors.actionError ? (
            <div className="text-red-600">{errors.actionError}</div>
          ) : message ? (
            <div className="text-green-500">{message}</div>
          ) : null}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
              className="mt-1 p-1 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-white"
            >
              CNIC
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              defaultValue={initialData?.cnic}
              required
              className="mt-1 p-1 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.cnic && (
              <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-white"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue={initialData?.role}
              className="mt-1 p-1 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a role</option>
              <option value="admin">User</option>
              <option value="user">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="house"
              className="block text-sm font-medium text-white"
            >
              House
            </label>
            <select
              id="house"
              required
              name="house"
              defaultValue={initialData?.house}
              className="mt-1 p-1 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a house</option>
              <option value="Tolerance">Tolerance</option>
              <option value="Faith">Faith</option>
              <option value="Unity">Unity</option>
              <option value="Discipline">Discipline</option>
            </select>
            {errors.house && (
              <p className="mt-1 text-sm text-red-600">{errors.house}</p>
            )}
          </div>

          <div className="w-full flex flex-col">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Profile Image
            </label>
            <UploadButton
              endpoint={"imageUploader"}
              disabled={isLoading}
              appearance={{
                button: {
                  width: "100%",
                  marginTop: "0.25rem",
                },
              }}
              onUploadBegin={() => {
                setImageUploading(true);
              }}
              onClientUploadComplete={(res) => {
                setImagePreview(res[0].url);
                setImageUploading(false);
              }}
              onUploadError={(error: Error) => {
                setErrors({
                  ...errors,
                  image: "Some error occured uploading the image",
                });
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-2 w-32 h-32 object-cover rounded-full"
              />
            )}
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || imageUploading || !imagePreview}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isLoading
              ? "Creating..."
              : imageUploading
              ? "Waiting for image upload to finish"
              : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
