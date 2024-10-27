import axios, { AxiosError } from 'axios';
import { AuthResponse, UserResponse } from '../config/model';
import { CONFIG } from '../config/environment';

export const postAuthToken = async (code: string): Promise<AuthResponse | AxiosError> => {
  return await axios.post(CONFIG.API_URL + '/api/verify', { code }).catch((error) => {
    return error
  });
}

export const getVerifiedUser = async (token: string): Promise<UserResponse | AxiosError> => {
  return await axios.get(CONFIG.API_URL + '/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch((error) => {
    return error
  });
}

