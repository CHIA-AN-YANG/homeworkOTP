export interface UserData {
  username: string;
  photo: string;
  desc: string;
  quote: string;
}

export interface AuthState {
  user: UserData | null;
  error: string | null;
  loading: boolean;
  status: EntityStatus;
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

export type EntityState<T> = {
  value: T | null;
  status: EntityStatus;
  error: string | null;
}

export enum EntityStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}

