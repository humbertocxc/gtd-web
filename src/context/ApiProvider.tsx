"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionProvider, signIn } from "next-auth/react";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  zipCode?: string;
  bairro?: string;
  city?: string;
  state?: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  zipCode?: string;
  bairro?: string;
  city?: string;
  state?: string;
}

interface ApiContextType {
  registerUser: (
    data: Omit<SignUpData, "confirmPassword">
  ) => Promise<RegisterResponse>;
  getUserData: () => Promise<UserData>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within ApiProvider");
  return context;
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const registerUser = async (data: Omit<SignUpData, "confirmPassword">) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const result = await response.json();

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    try {
      const meResp = await fetch("/api/user/me");
      if (meResp.ok) {
        const me = await meResp.json();
        try {
          localStorage.setItem("user", JSON.stringify(me));
        } catch {}
      }
    } catch {
      console.log("ops");
    }

    return result;
  };

  const getUserData = async (): Promise<UserData> => {
    const response = await fetch("/api/user/me");
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch user data");
    }
    return response.json();
  };

  return (
    <SessionProvider>
      <ApiContext.Provider value={{ registerUser, getUserData }}>
        {children}
      </ApiContext.Provider>
    </SessionProvider>
  );
};
