import axios, { AxiosError } from 'axios';
import { AuthResponse, UserResponse } from '../config/model';
import { CONFIG } from '../config/environment';

const apiUrl = CONFIG.API_URL + ":" + CONFIG.API_PORT;

export const postAuthToken = async (code: string): Promise<AuthResponse | AxiosError> => {
  return await axios.post(apiUrl + '/api/verify', { code }).catch((error) => {
    return error
  });
}

export const getVerifiedUser = async (token: string): Promise<UserResponse | AxiosError> => {
  return await axios.get(apiUrl + '/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch((error) => {
    return error
  });
}

