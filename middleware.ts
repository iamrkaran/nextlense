import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  // if (path.startsWith("/api/") && !token) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // Protect the /users route
  if (path.startsWith("/users") && !token) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    (path.startsWith("/create") ||
      path.startsWith("/explore") ||
      path.startsWith("/notifications") ||
      path.startsWith("/home") ||
      path.startsWith("/messages")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/users/:path*",
    "/home/:path*",
    "/create",
    "/explore",
    "/unauthorized",
    "/notifications",
    "/messages",
  ],
};
