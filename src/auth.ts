import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User as NextAuthUser } from "next-auth";

export type House = "Unity" | "Faith" | "Discipline" | "Tolerance" | "Headboy";
export type Role = "admin" | "user";

// Define our custom user type
export interface CustomUser {
  id: string;
  name: string;
  cnic: string;
  image: string;
  house: House;
  role: Role;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      cnic: string;
      image: string;
      house: House;
      role: Role;
    } & DefaultSession["user"];
  }

  // Override the built-in User type
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends CustomUser {}
}

class InvalidLoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidLoginError";
  }
}


//! This is some shitty ts code but it works understand and patch later
export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cnic: { label: "CNIC", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.cnic || !credentials?.password) {
          throw new InvalidLoginError("Incomplete Credentials");
        }

        const user: CustomUser = {
          id: "Veryrandom23223",
          name: "Ali Raza",
          cnic: "123456789",
          image: "https://dummyimage.com/50X50",
          house: "Tolerance",
          role:
            credentials.cnic === process.env.NEXT_ADMIN_CNIC ? "admin" : "user",
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (user) {
        token.id = user.id ?? "";
        token.name = user.name;
        token.cnic = user.cnic;
        token.image = user.image ?? "";
        token.house = user.house;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          cnic: token.cnic,
          image: token.image,
          house: token.house || "Unity",
          role: token.role || "user",
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
