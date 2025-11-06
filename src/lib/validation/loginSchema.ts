import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Endereço de e-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});
