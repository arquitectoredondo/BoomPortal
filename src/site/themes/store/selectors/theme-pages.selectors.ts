import { AppState } from '../../../../core/store/store';
import { ThemePageState } from '../reducers/theme-pages.reducer';

export const selectThemePagesState = (store: AppState): ThemePageState =>
  store.themePages;

export const selectThemePages = (store: AppState): any[] =>
  selectThemePagesState(store)?.themePages;

export const selectThemePagesPending = (store: AppState): boolean =>
  selectThemePagesState(store)?.loading;

export const selectThemePagesError = (store: AppState): boolean =>
  selectThemePagesState(store)?.error;
