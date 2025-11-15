const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

interface RefreshTokenResponseWithExpiry extends RefreshTokenResponse {
  expiresAt: number;
}

export async function registerUser(
  data: RegisterUserData
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (response.status === 409) {
      throw new Error("Email already registered");
    }
    
    if (response.status === 400) {
      throw new Error(errorData.message || "Invalid registration data");
    }
    
    throw new Error(
      errorData.message || "Registration failed. Please try again."
    );
  }

  return response.json();
}

export async function loginUser(
  data: LoginUserData
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid email or password");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed. Please try again.");
  }

  return response.json();
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Refresh token expired or invalid");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Token refresh failed. Please login again."
    );
  }

  return response.json();
}

export async function verifyToken(
  accessToken: string
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Token is invalid or expired");
    }

    throw new Error("Token verification failed");
  }

  return response.json();
}

export async function refreshUserToken(
  refreshToken: string
): Promise<RefreshTokenResponseWithExpiry> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Refresh token expired or invalid");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Token refresh failed. Please login again."
    );
  }

  const data = await response.json();
  
  // Calculate expiration time (15 minutes from now)
  const FIFTEEN_MINUTES_IN_SECONDS = 900;
  const expiresAt = Math.floor(Date.now() / 1000) + FIFTEEN_MINUTES_IN_SECONDS;

  return {
    ...data,
    expiresAt,
  };
}
