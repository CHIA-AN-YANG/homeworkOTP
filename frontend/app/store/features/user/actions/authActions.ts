import { AuthResponse, ErrorResponse, UserData, UserResponse } from '@/app/config/model';
import axios, { AxiosError } from 'axios';
import { setLoading, clearLoading, setError, setUser, clearUser, setAuthStatusLoading, setAuthStatusError, setAuthStatusSuccess } from '../reducers/authSliceReducer';
import { AppThunk } from '../../../store';
import { get } from 'http';
import { getVerifiedUser, postAuthToken } from '@/app/api/authAdaptor';

const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

export const getAuth = (code: string): AppThunk => (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(setAuthStatusLoading());
    postAuthToken(code).then((response) => {
      console.log('response', response);

      if (response.status === 200 && (<AuthResponse>response).data.valid === true) {
        dispatch(getAuthSuccess((<AuthResponse>response).data.token!));
        return;
      } else if (response.status === 401 || (<AuthResponse>response).data.valid === false) {
        dispatch(getAuthFail('code is not valid'));
        return;
      } else {
        dispatch(getAuthFail((<AxiosError>response).message || 'authentication failed'));
      }
    });

  } catch (error) {
    dispatch(getAuthFail(error instanceof Error ? error.message : 'authentication failed'));
  }
};

export const getAuthSuccess = (token: string): AppThunk => (dispatch) => {
  Cookies.set(TOKEN_COOKIE, token);
  dispatch(clearLoading());
  dispatch(setAuthStatusSuccess());
};

export const getAuthFail = (errorMessage: string): AppThunk => (dispatch) => {
  console.error('Auth Error:', errorMessage);
  dispatch(setError(errorMessage));
  dispatch(setAuthStatusError());
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(setAuthStatusLoading());
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
        dispatch(getUserFail((<ErrorResponse>response).data.error || 'Failed to fetch user'));
        return;
      }
    });
  } catch (error) {
    dispatch(getUserFail(error instanceof Error ? error.message : 'Failed to fetch user'));
  }
};

export const getUserSuccess = (userData: UserData): AppThunk => (dispatch) => {
  dispatch(setUser(userData));
  dispatch(setAuthStatusSuccess());
};

export const getUserFail = (errorMessage: string): AppThunk => (dispatch) => {
  console.error('User Error:', errorMessage);
  dispatch(clearUser());
  dispatch(setError(errorMessage));
  dispatch(setAuthStatusError());
};

export const loadUser = (): AppThunk => async (dispatch, getState) => {
  const token = Cookies.get(TOKEN_COOKIE);
  const { user } = getState().auth;

  if (token && !user) {
    dispatch(getUser());
  }
};
