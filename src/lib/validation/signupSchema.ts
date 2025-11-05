import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Endereço de e-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
    zipCode: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .pipe(z.string().length(8, "CEP deve ter 8 dígitos"))
      .optional(),
    bairro: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });
