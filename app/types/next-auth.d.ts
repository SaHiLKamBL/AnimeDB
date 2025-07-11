// next-auth.d.ts or types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
