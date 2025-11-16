"use server";

import { registerUser } from "@/lib/services/auth-service";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function registerUserAction(
  data: RegisterUserInput
): Promise<ActionResponse> {
  try {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log(result);

    return {
      success: true,
      message: "Usuário cadastrado com sucesso!",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Falha no cadastro. Tente novamente.";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
