"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiProvider";
import { Card, CardContent } from "@/components/ui/card";

interface UserData {
  id: string;
  name: string;
  email: string;
  zipCode?: string;
  bairro?: string;
  city?: string;
  state?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { getUserData } = useApi();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    getUserData()
      .then(setUserData)
      .catch((err) => {
        console.error(err);
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [session, status, router, getUserData]);

  if (status === "loading" || loading) {
    return <div className="container mx-auto p-4">Carregando...</div>;
  }

  if (!userData) {
    return <div className="container mx-auto p-4">Erro ao carregar dados.</div>;
  }

  return (
    <div className="mx-2">
      <Card className="container mx-auto mt-25 p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">
            Bem-vindo, {userData.name}!
          </h1>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Nome:</strong> {userData.name}
            </p>
            <p>
              <strong>CEP:</strong> {userData.zipCode || "Não informado"}
            </p>
            <p>
              <strong>Bairro:</strong> {userData.bairro || "Não informado"}
            </p>
            <p>
              <strong>Cidade:</strong> {userData.city || "Não informado"}
            </p>
            <p>
              <strong>Estado:</strong> {userData.state || "Não informado"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
