import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { loginUser, refreshUserToken } from "./services/auth-service";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        try {
          const authResponse = await loginUser({ email, password });
          const { user, accessToken, refreshToken } = authResponse;

          const tokenExpiresAt = new Date(
            Date.now() + 15 * 60 * 1000
          );

          await prisma.user.upsert({
            where: { externalId: user.id },
            create: {
              externalId: user.id,
              email: user.email,
              name: user.name,
              role: user.role || "USER",
              accessToken,
              refreshToken,
              tokenExpiresAt,
            },
            update: {
              email: user.email,
              name: user.name,
              role: user.role || "USER",
              accessToken,
              refreshToken,
              tokenExpiresAt,
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || "USER",
          };
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user && trigger === "signIn") {
        const typedUser = user as {
          id: string;
          email: string;
          name: string;
          role: string;
        };

        token.externalId = typedUser.id;
        token.email = typedUser.email;
        token.name = typedUser.name;
        token.role = typedUser.role;

        return token;
      }

      if (token.externalId) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { externalId: token.externalId as string },
          });

          if (!dbUser) {
            console.error("User not found in database");
            return { ...token, error: "UserNotFound" };
          }

          const now = new Date();
          const isTokenValid = dbUser.tokenExpiresAt > now;

          if (isTokenValid) {
            token.accessToken = dbUser.accessToken;
            return token;
          } else {
            try {
              const refreshResponse = await refreshUserToken(
                dbUser.refreshToken
              );

              await prisma.user.update({
                where: { externalId: token.externalId as string },
                data: {
                  accessToken: refreshResponse.accessToken,
                  refreshToken: refreshResponse.refreshToken,
                  tokenExpiresAt: new Date(refreshResponse.expiresAt * 1000),
                },
              });

              token.accessToken = refreshResponse.accessToken;
              return token;
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              return { ...token, error: "RefreshTokenExpired" };
            }
          }
        } catch (error) {
          console.error("JWT callback error:", error);
          return { ...token, error: "JWTCallbackError" };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.error) {
        return { ...session, error: token.error as string };
      }

      if (session.user) {
        session.user.id = token.externalId as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }

      return session;
    },

    async signIn() {
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return baseUrl;
      }

      if (url.startsWith("/")) return `${baseUrl}${url}`;

      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}
