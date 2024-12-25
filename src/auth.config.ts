import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInDB } from "./actions/user/signin.action";
import { CredentialsSignin } from "next-auth";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        cnic: { type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.cnic) {
          throw new InvalidLoginError({
            message: "Please enter your CNIC",
            cause: "Invalid identifier or password",
          });
        }

        //* The first admin cnic will be present in the envs so its data will be static
        const FIRST_ADMIN_CNIC = process.env.NEXT_ADMIN_CNIC;

        if (!FIRST_ADMIN_CNIC) {
          throw new Error("Some server error occured");
        }

        let isFirstAdmin = false;
        if (credentials.cnic === FIRST_ADMIN_CNIC) {
          isFirstAdmin = true;
        }

        if (isFirstAdmin) {
          return {
            name: "Admin",
            email: "admin@admin.com",
            image: "https://avatars.githubusercontent.com/u/10214025?v=4",
            role: "admin",
            cnic: FIRST_ADMIN_CNIC,
            _id: "superstrongfirstadminid",
          };
        }

        //* If the user is not the first admin then we will check the database
        //* The user returned from the database can be either a user or a admin crated from the dashboard
        const res = await signInDB(credentials?.cnic.toString());

        if (!res.success) {
          throw new InvalidLoginError({
            message: "Invalid credentials",
            code: "Invalid credentials",
          });
        }

        return res.user;
      },
    }),
  ],
} satisfies NextAuthConfig;
