import { AxiosError } from 'axios';

export interface UserData {
  username: string;
  photo: string;
  quote: string;
}

export interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  authStatus: EntityStatus;
}

export interface AuthResponse extends Response {
  data: {
    valid: boolean,
    token?: string
  }
}

export interface UserResponse extends Response {
  data: UserData
}

export enum EntityStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}