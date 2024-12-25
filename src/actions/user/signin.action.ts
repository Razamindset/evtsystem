"use server";

import { signIn, signOut } from "@/auth";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/user.model";
import { AuthError, CredentialsSignin } from "next-auth";

interface SignInPayload {
  cnic: String;
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

    return { success: true, message: "Login successful" };
  } catch (error) {
    //! For some reason custom erros were not wroking so lets just say if credentials error then provide a cnic message
    if (error instanceof CredentialsSignin) {
      return { success: false, message: "Invlalid Cnic" };
    }

    // Fallback error message
    return {
      success: false,
      message: "An error occurred Please try again or check your cnic",
    };
  }
}

export async function signInDB(cnic: string) {
  try {
    if (!cnic) {
      throw new Error("cnic is required");
    }

    await dbConnect();

    const findUser = User.findOne({ cnic: cnic });

    if (!findUser) {
      throw new Error("User not found");
    }

    return {
      success: true,
      user: findUser,
      message: "User found",
    };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function signOutAction() {
  console.log("signinig out the user");

  await signOut();
}
