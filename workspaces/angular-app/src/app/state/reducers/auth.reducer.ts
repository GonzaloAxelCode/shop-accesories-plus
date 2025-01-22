import { createReducer, on } from '@ngrx/store';



import { AuthState } from '@/app/models/auth.models';
import { clearTokensLocalstorage, getTokensFromLocalStorage } from '@/app/services/localstorage/notification.service';
import {
  clearTokensAction,
  loginInAction,
  loginInActionFail,
  loginInActionSuccess
} from '../actions/auth.actions';

const { refreshToken, accessToken } = getTokensFromLocalStorage();

export const initialState: AuthState = {
  errors: {},
  isAuthenticated: false,
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
  isLoadingLogin: false,
  isLoadingLogout: false
};

export const authReducer = createReducer(
  initialState,
  on(loginInAction, (state, payload) => ({
    ...state,
    ...payload,
    isLoadingLogin: true,
  })),
  on(loginInActionSuccess, (state, payload) => ({
    ...state,
    ...payload,
    isLoadingLogin: false,

  })),
  on(loginInActionFail, (state, payload) => ({
    ...state,
    ...payload,
    isLoadingLogin: false,
  })),
  on(clearTokensAction, (state, payload) => {
    clearTokensLocalstorage();
    return {
      ...state,
      ...payload,
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      isLoadingLogout: true,
    };
  })
);
