import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerUser } from "@/lib/services/auth-service";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, zipCode, bairro, city, state } =
      await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const authResponse = await registerUser({
      name,
      email,
      password,
    });

    const { user, accessToken, refreshToken } = authResponse;

    const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const savedUser = await prisma.user.create({
      data: {
        externalId: user.id,
        name: user.name,
        email: user.email,
        zipCode,
        bairro,
        city,
        state,
        role: user.role || "USER",
        accessToken,
        refreshToken,
        tokenExpiresAt,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: { id: savedUser.id, name: savedUser.name, email: savedUser.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "User creation failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
