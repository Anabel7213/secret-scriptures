import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const isPublic =
    path === "/auth/login" || path === "/auth/signup" || path === "/auth";
  const token = req.cookies.get("token")?.value || "";
  if (isPublic && token.length > 0) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isPublic && !token.length > 0) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/my-scriptures",
    "/new-scripture/:path*"
  ],
};
