import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      _id: string;
      name: string;
      cnic: string;
      role: Role;
      house: House;
      image: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    name: string;
    cnic: string;
    image: string;
    role: Role;
    house: House;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    name: string;
    cnic: string;
    image: string;
    role: Role;
    house: House;
  }
}
