import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@/app/store/features/user/reducers/authSliceReducer';
import { AuthState } from '../model/model';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: typeof window !== 'undefined' ? window.__INITIAL_STATE__ as { auth: AuthState } : {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;