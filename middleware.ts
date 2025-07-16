import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Always allow auth API
        if (pathname.startsWith("/api/auth")) {
          return true;
        }

        // Always allow static Next.js internals
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon.ico")
        ) {
          return true;
        }

        // Always allow static files (jpg, png, svg, webp, etc.)
        if (
          pathname.match(/\.(jpg|jpeg|png|svg|webp|gif|ico)$/)
        ) {
          return true;
        }

        // Always allow public pages
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Require token for everything else
        if (!token) {
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);
