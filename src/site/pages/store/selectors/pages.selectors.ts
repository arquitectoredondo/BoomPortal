import { AppState } from '../../../../core/store/store';
import { PortalPagesState } from '../reducers/pages.reducers';

export const selectPortalPagesState = (store: AppState): PortalPagesState =>
  store.pages;

export const selectPortalPages = (store: AppState): any[] =>
  selectPortalPagesState(store).pages;

export const selectPortalPagesLoading = (store: AppState): boolean =>
  selectPortalPagesState(store).loading;

export const selectPortalPagesError = (store: AppState): boolean =>
  selectPortalPagesState(store).error;

export const selectPortalPagesErrorMsg = (store: AppState): string =>
  selectPortalPagesState(store).errorMsg;
