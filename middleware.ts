import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const authMw = withAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

function noopMiddleware() {
  return NextResponse.next();
}

const shouldUseNoop =
  process.env.NODE_ENV === "development" && !process.env.NEXTAUTH_SECRET;

const exported = shouldUseNoop ? noopMiddleware : authMw;

export default exported;

export const config = {
  matcher: ["/dashboard/:path*"],
};
