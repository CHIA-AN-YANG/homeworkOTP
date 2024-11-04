import { getVerifiedUser } from '@/app/api/authAdaptor';
import { UserResponse, UserData } from '@/app/model/model';
import { AppThunk } from '@/app/store/store';
import { AxiosError } from 'axios';
import { setStatusLoading, setUser, setStatusSuccess, clearUser, setError, setStatusError, setStatusIdle } from '../reducers/authSliceReducer';

const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatusLoading());
    const token = Cookies.get(TOKEN_COOKIE);
    if (!token) {
      dispatch(getUserFail('No token found'));
      return;
    }
    getVerifiedUser(token).then((response) => {
      if (response.status === 200) {
        dispatch(getUserSuccess((<UserResponse>response).data));
        return;
      } else {
        dispatch(getUserFail((<AxiosError>response).message || 'Failed to fetch user'));
        return;
      }
    });
  } catch (error) {
    dispatch(getUserFail(error instanceof Error ? error.message : 'Failed to fetch user'));
  }
};

export const getUserSuccess = (userData: UserData): AppThunk => (dispatch) => {
  dispatch(setUser(userData));
  dispatch(setStatusSuccess());
};

export const getUserFail = (errorMessage: string): AppThunk => (dispatch) => {
  dispatch(clearUser());
  dispatch(setError(errorMessage));
  dispatch(setStatusError());
};

export const loadUser = (): AppThunk => async (dispatch, getState) => {
  const token = Cookies.get(TOKEN_COOKIE);
  const { user } = getState().auth;

  if (token && !user) {
    dispatch(getUser());
  }
  if (!token) {
    dispatch(clearUser());
    dispatch(setStatusError());
  }
};

export const logoutUser = (): AppThunk => (dispatch) => {
  dispatch(setStatusLoading());
  Cookies.remove(TOKEN_COOKIE);
  dispatch(clearUser());
  dispatch(setStatusIdle());
};
