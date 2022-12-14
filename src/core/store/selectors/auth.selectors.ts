import { AppState, selectCoreState } from '../store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = (store: AppState): AuthState =>
  selectCoreState(store).auth;

export const selectLoginLoading = (store: AppState): boolean =>
  selectAuthState(store)?.loading;

export const selectLoginError = (store: AppState): boolean =>
  selectAuthState(store)?.error;

export const selectLoginUser = (store: AppState): string | undefined =>
  selectAuthState(store)?.user;

export const selectLoginLoggedIn = (store: AppState): boolean =>
  selectAuthState(store)?.loggedIn;
