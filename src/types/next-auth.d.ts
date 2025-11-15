import { DefaultSession } from "next-auth";

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    externalId?: string;
    email?: string;
    name?: string;
    role?: string;
    accessToken?: string;
    error?: string;
  }
}
