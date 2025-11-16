"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/services/auth-service";

export function useUserProfile() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token not available");
      }
      return getUserProfile(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}
