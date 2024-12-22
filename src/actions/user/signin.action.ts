"use server";

import { signIn, signOut } from "@/auth";

interface SignInPayload {
  cnic: String;
  password: String;
}

export async function singIn(payload: SignInPayload) {
  try {
    if (!payload) {
      throw new Error("Please provide credentials server action failed");
    }

    console.log("We are here");

    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    // Check for custom thrown errors
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    // Fallback error message
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function signOutAction() {
  console.log("signinig out the user");
  
  await signOut();
}
