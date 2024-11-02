import axios, { AxiosError } from 'axios';
import { AuthResponse, UserResponse } from '../model/model';
import crypto from 'crypto';

let apiUrl: string;
if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
}

export const postAuthToken = async (code: string): Promise<AuthResponse | AxiosError> => {
  const hashedCode = await hashCode(code);
  return await axios.post(apiUrl + '/api/verify', { code: hashedCode }, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    }
  }).catch((error) => {
    return error
  });
}

export const getVerifiedUser = async (token: string): Promise<UserResponse | AxiosError> => {
  return await axios.get(apiUrl + '/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}

async function hashCode(plainCode: string) {
  return crypto.createHash('sha256').update(plainCode).digest('hex');
}

