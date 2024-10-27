import { AuthState, EntityStatus, UserData } from '@/app/config/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  authStatus: EntityStatus.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    setAuthStatusSuccess: (state) => {
      state.authStatus = EntityStatus.SUCCESS;
    },
    setAuthStatusError: (state) => {
      state.authStatus = EntityStatus.ERROR;
    },
    setAuthStatusLoading: (state) => {
      state.authStatus = EntityStatus.LOADING;
    },
    setAuthStatusIdle: (state) => {
      state.authStatus = EntityStatus.IDLE;
    },

  },
});

export const {
  setLoading,
  clearLoading,
  setError,
  setUser,
  clearUser,
  setAuthStatusSuccess,
  setAuthStatusError,
  setAuthStatusLoading,
  setAuthStatusIdle
} = authSlice.actions;

export default authSlice.reducer;