import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        cnic: {},
        password: {},
      },
      async authorize(credentials, request) {
        console.log(credentials);

        if (!credentials?.cnic || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        //Check the password for lets keep it simple lets do it for admin now
        const ADMIN_CNIC = process.env.NEXT_ADMIN_CNIC;
        const ADMIN_PASSWORD = process.env.NEXT_ADMIN_PASSWORD;

        if (!ADMIN_CNIC || !ADMIN_PASSWORD) {
          throw new Error("Some server error occured");
        }

        let isAdmin = false;
        if (
          credentials.cnic === ADMIN_CNIC &&
          credentials.password === ADMIN_PASSWORD
        ) {
          isAdmin = true;
        }

        if (isAdmin) {
          return {
            id: "1",
            name: "Admin user",
            email: "admin@example.com",
            cnic: ADMIN_CNIC,
            image: "image.png",
            house: "Discipline",
            role: "admin",
          };
        }
        return {
          id: "2",
          name: "John Doe",
          email: "johndoe@example.com",
          cnic: "123456789012",
          image: "image.png",
          house: "Discipline",
          role: "user",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
