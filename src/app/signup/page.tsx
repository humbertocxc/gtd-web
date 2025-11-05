"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/validation/signupSchema";
import FormInput from "@/components/FormInput";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const fetchAddress = async (zipCode: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue("address", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      zipCode: data.zipCode,
      address: data.address,
      numero: data.numero,
      bairro: data.bairro,
      city: data.city,
      state: data.state,
    };
    console.log("User data:", user);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nome"
          placeholder="Seu nome"
          register={register("name")}
          error={errors.name?.message}
        />
        <FormInput
          label="E-mail"
          placeholder="Seu e-mail"
          register={register("email")}
          error={errors.email?.message}
        />
        <FormInput
          label="Senha"
          type="password"
          placeholder="Sua senha"
          register={register("password")}
          error={errors.password?.message}
        />
        <FormInput
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <FormInput
          label="CEP"
          placeholder="Seu CEP"
          register={register("zipCode")}
          error={errors.zipCode?.message}
          onBlur={(e) => fetchAddress(e.target.value)}
        />
        <FormInput
          label="Endereço"
          placeholder="Seu endereço"
          register={register("address")}
          error={errors.address?.message}
        />
        <FormInput
          label="Número"
          placeholder="Número"
          register={register("numero")}
          error={errors.numero?.message}
        />
        <FormInput
          label="Bairro"
          placeholder="Seu bairro"
          register={register("bairro")}
          error={errors.bairro?.message}
        />
        <FormInput
          label="Cidade"
          placeholder="Sua cidade"
          register={register("city")}
          error={errors.city?.message}
        />
        <FormInput
          label="Estado"
          placeholder="Seu estado"
          register={register("state")}
          error={errors.state?.message}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
