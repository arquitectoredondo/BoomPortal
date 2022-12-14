import {
  AuthActionTypes,
  LOG_IN,
  LOG_OFF,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from './auth.types';

export const logIn = (): AuthActionTypes => ({
  type: LOG_IN
});

export const logInSuccess = (user: string): AuthActionTypes => ({
  type: LOG_IN_SUCCESS,
  payload: user
});

export const logInFailure = (): AuthActionTypes => ({
  type: LOG_IN_FAILURE
});

export const logOff = (): AuthActionTypes => ({
  type: LOG_OFF
});
