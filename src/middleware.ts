import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//? Fishy code
export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    // Redirect to sign-in page if the token is not found
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  console.log(req.url);

  // Check if the requested path starts with /admin
  if (req.url.includes("/admin")) {
    // Check if the user has the admin role
    if (token.role !== "admin") {
      // Redirect to an unauthorized page or home page if the user is not an admin
      return NextResponse.redirect(new URL("/vote", req.url));
    }
  }
  
  // Admin shouldnt be able to go to the voting page
  if (req.url.includes("/vote")) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If all checks pass, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vote"],
};
