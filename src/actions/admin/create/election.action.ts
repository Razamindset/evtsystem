"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/dbConnect";
import Election, { ElectionTypes } from "@/lib/db/models/election.model";

export async function CreateElectionAction(payload: PayloadType) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    if (!payload) throw new Error("Invalid payload");

    if (
      !Array.isArray(payload.participantsIds) ||
      payload.participantsIds.some((id) => typeof id !== "string")
    ) {
      throw new Error(
        "Invalid participantsIds format. Expected an array of strings."
      );
    }

    await dbConnect();

    const newElectionData: Partial<ElectionTypes> = {
      name: payload.name.trim(),
      image: payload.image.trim(),
      house: payload.house,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      // participants: payload.participantsIds.map((id) => ({
      //   cnic: id.trim(),
      // })),
    };

    console.log(JSON.stringify(newElectionData, null, 2)); // Safely log election data

    const newElection = new Election(newElectionData);
    await newElection.save();

    return {
      success: true,
      message: "Election created successfully",
      election: newElection,
    };
  } catch (error) {
    console.error("Error creating election:", error);
    return {
      success: false,
      message: "Failed to create election",
      error: (error as Error).message,
    };
  }
}
