import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // or your actual auth config path

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
