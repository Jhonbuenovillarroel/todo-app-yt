import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await getToken({ secret: process.env.NEXTAUTH_SECRET, req });

  if (
    session &&
    (pathname === "/auth/register" || pathname === "/auth/login")
  ) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  if (!session && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
