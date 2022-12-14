export const LOG_IN: string = '[AUTH] LOG IN';
export const LOG_IN_SUCCESS: string = '[AUTH] LOG IN SUCCESS';
export const LOG_IN_FAILURE: string = '[AUTH] LOG IN FAILURE';
export const LOG_OFF: string = '[AUTH] LOG OFF';

export interface LogIn {
  type: typeof LOG_IN;
}

export interface LogInSuccess {
  type: typeof LOG_IN_SUCCESS;
  payload: any;
}

export interface LogInFailure {
  type: typeof LOG_IN_FAILURE;
}

export interface LogOff {
  type: typeof LOG_OFF;
}

export type AuthActionTypes = LogIn | LogInSuccess | LogInFailure | LogOff;
