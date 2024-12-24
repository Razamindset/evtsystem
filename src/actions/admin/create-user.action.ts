"use server";

import { auth } from "@/auth";
import User from "@/lib/db/models/user.model";
import { revalidatePath } from "next/cache";

export async function createUser(payload: UserCreationActionPaload) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }
    if (!payload) {
      throw new Error("Incomplete credentials");
    }

    const user = await User.create({
      ...payload,
    });

    revalidatePath("/addusers");

    console.log(user);

    return {
      success: true,
      error: false,
      message: "user Created successfully",
    };
  } catch (error: any) {
    console.log(error.message);

    return {
      error: true,
      success: false,
      message: error.message,
    };
  }
}
