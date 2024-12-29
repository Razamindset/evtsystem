import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the user document (with Mongoose Document)
interface CustomUser extends Document {
  name: string;
  cnic: string;
  image: string;
  house: House;
  role: Role;
}

// Define the Mongoose schema
const userSchema = new Schema<CustomUser>(
  {
    name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    house: {
      type: String,
      enum: ["Unity", "Faith", "Discipline", "Tolerance", "Headboy"],
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the User model
const User =
  mongoose?.models?.User || mongoose?.model<CustomUser>("User", userSchema);

export default User;
