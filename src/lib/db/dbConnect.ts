import mongoose from "mongoose";

let isConnected = false; // Global variable to track the connection state

export default async function dbConnect(): Promise<void> {
  if (isConnected) {
    console.log("Database is already connected.");
    return;
  }

  const mongoUrl = process.env.NEXT_MONGO_URL;

  if (!mongoUrl) {
    throw new Error(
      "NEXT_MONGO_URL is not defined in the environment variables."
    );
  }

  try {
    const connection = await mongoose.connect(mongoUrl);

    isConnected = !!connection.connections[0].readyState;
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error(
      "Error while connecting to the database:",
      (error as Error).message
    );
    throw new Error("Database connection failed");
  }
}
