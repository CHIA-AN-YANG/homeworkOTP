export interface VerificationRequest {
  code: string;
}

export interface VerificationResponse {
  valid: boolean;
  token?: string;
}

export interface UserData {
  username: string;
  quote: string;
  photo: string;
}

export interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}