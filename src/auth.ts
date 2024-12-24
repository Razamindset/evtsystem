import NextAuth, { NextAuthConfig } from "next-auth";
import authConfig from "@/auth.config";

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.cnic = token.cnic;
        session.user.role = token.role;
        session.user.house = token.house;
        session.user.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id ?? "";
        token.name = user.name ?? "";
        token.cnic = user.cnic;
        token.image = user.image ?? "";
        token.house = user.house;

        //*! I dont know but why but sometimes the role is undefined
        if (user?.role === "admin") {
          token.role = "admin";
          return token;
        }

        token.role = "user";
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
