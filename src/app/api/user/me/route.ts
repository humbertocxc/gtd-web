import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refreshAccessToken } from "@/lib/services/auth-service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { externalId: session.user.id },
    select: { refreshToken: true },
  });

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const data = await refreshAccessToken(dbUser.refreshToken);
    return NextResponse.json(data.user);
  } catch {
    return NextResponse.json({ error: "Failed to get user data" }, { status: 500 });
  }
}
