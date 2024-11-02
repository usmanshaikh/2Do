interface User {
  name: string;
  email: string;
  isEmailVerified: boolean;
  id: string;
}

interface Token {
  token: string;
  expires: string;
}

interface Tokens {
  access: Token;
  refresh: Token;
}

export interface RegisterResponse {
  user: User;
  tokens: Tokens;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface RefreshResponse {
  access: Token;
  refresh: Token;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password: string;
  token: string;
}
