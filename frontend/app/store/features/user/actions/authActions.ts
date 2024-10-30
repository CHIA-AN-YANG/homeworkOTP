import { AuthResponse } from '@/app/config/model';
import { AxiosError } from 'axios';
import { setError, setStatusLoading, setStatusError, setStatusSuccess } from '../reducers/authSliceReducer';
import { AppThunk } from '../../../store';
import { postAuthToken } from '@/app/api/authAdaptor';
const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

export const getAuth = (code: string): AppThunk => (dispatch) => {
  try {
    dispatch(setStatusLoading());
    postAuthToken(code).then((response) => {

      if (response.status === 200 && (<AuthResponse>response).data.valid === true) {
        dispatch(getAuthSuccess((<AuthResponse>response).data.token!));
        return;
      } else if (response.status === 401 || (<AuthResponse>response).data.valid === false) {
        dispatch(getAuthFail('unauthorized'));
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
  dispatch(setStatusSuccess());
};

export const getAuthFail = (errorMessage: string): AppThunk => (dispatch) => {
  console.error('Auth Error:', errorMessage);
  dispatch(setError(errorMessage));
  dispatch(setStatusError());
};