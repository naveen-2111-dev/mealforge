import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookie = parse(req.headers.get("cookie") || "");
  const url = req.nextUrl;

  const protectedRoutes = {
    "/Main/dashboard": "Token",
  };

  const requiredCookie = protectedRoutes[url.pathname];
  if (requiredCookie && !cookie[requiredCookie]) {
    const redirectTo = url.pathname === "/Main/dashboard" ? "/auth/Login" : "/";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Main/dashboard"
  ],
};
