import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Endereço de e-mail inválido"),
    password: z
      .string()
      .min(10, "A senha deve ter pelo menos 10 caracteres")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
        "A senha deve incluir pelo menos uma letra maiúscula, um número e um caractere especial"
      ),
    confirmPassword: z.string().min(10, "Confirmação de senha é obrigatória"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem coincidir",
        path: ["confirmPassword"],
      });
    }
  });
