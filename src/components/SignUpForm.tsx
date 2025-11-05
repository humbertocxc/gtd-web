"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
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
import { AddressData } from "@/lib/services/address/cep-service";
import { CepField } from "./CepField";

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const handleAddressFetched = (addressData: AddressData | null) => {
    if (addressData) {
      form.setValue("bairro", addressData.bairro);
      form.setValue("city", addressData.city);
      form.setValue("state", addressData.state);
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      zipCode: data.zipCode,
      bairro: data.bairro,
      city: data.city,
      state: data.state,
    };
    console.log("User data:", user);
  };

  return (
    <div className="max-w-md lg:max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
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
                    <Input placeholder="Seu e-mail" {...field} />
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
                    <Input type="password" placeholder="Sua senha" {...field} />
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
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <CepField
              control={form.control}
              onAddressFetched={handleAddressFetched}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full mt-4">
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
