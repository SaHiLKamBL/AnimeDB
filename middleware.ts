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
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/sign-up") ||
           pathname.startsWith("/api/chat") // Add this line
        ) {
          return true;
        }

        // Rest of your existing checks...
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon.ico")
        ) {
          return true;
        }

        if (pathname.match(/\.(jpg|jpeg|png|svg|webp|gif|ico)$/)) {
          return true;
        }

        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

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