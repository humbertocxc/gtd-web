"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validation/signupSchema";
import { signUpDefaultValues } from "@/lib/validation/signupDefaults";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { Alert } from "./Alert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    setAlert(null);

    try {
      const result = await registerUserAction({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        setAlert({
          message: result.message || "Usuário cadastrado com sucesso!",
          type: "success",
        });

        setTimeout(() => {
          router.push("/gtd");
        }, 1000);
      } else {
        setAlert({
          message: result.error || "Falha no cadastro. Tente novamente.",
          type: "error",
        });
        setLoading(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Falha no cadastro. Tente novamente.";

      setAlert({
        message: errorMessage,
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md lg:max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu e-mail"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Sua senha"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirme sua senha"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full mt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {loading ? "Processando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
