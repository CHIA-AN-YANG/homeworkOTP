import { RootState } from '@/app/store/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectStatus = (state: RootState) => state.auth.authStatus;
export const selectError = (state: RootState) => state.auth.error;