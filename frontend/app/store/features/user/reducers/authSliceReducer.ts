import { AuthState, EntityStatus, UserData } from '@/app/model/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  status: EntityStatus.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoader: (state) => {
      state.loading = true;
    },
    clearLoader: (state) => {
      state.loading = false;
    },
    setStatusSuccess: (state) => {
      state.status = EntityStatus.SUCCESS;
    },
    setStatusError: (state) => {
      state.status = EntityStatus.ERROR;
    },
    setStatusLoading: (state) => {
      state.status = EntityStatus.LOADING;
    },
    setStatusIdle: (state) => {
      state.status = EntityStatus.IDLE;
    },

  },
});

export const {
  setError,
  setUser,
  clearUser,
  setStatusSuccess,
  setStatusError,
  setStatusLoading,
  setStatusIdle
} = authSlice.actions;

export default authSlice.reducer;