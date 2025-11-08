import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const authMw = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminDashboard = req.nextUrl.pathname.startsWith("/admin-dashboard");

    if (isAdminDashboard && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL(`/${token?.id}`, req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

function noopMiddleware() {
  return NextResponse.next();
}

const shouldUseNoop =
  process.env.NODE_ENV === "development" && !process.env.NEXTAUTH_SECRET;

const exported = shouldUseNoop ? noopMiddleware : authMw;

export default exported;

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|$).*)",
  ],
};
