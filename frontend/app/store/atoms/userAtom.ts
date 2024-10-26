import { atom } from 'recoil';

export interface UserState {
  username: string;
  quote: string;
  photo: string;
  error: string;
  loading: boolean;
}

export const defaultUserState: UserState = {
  username: '',
  quote: '',
  photo: '',
  error: '',
  loading: false,
};

export const userState = atom<UserState>({
  key: 'userState',
  default: defaultUserState,
});