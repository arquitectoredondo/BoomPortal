import { AppState } from '../../../../core/store/store';
import { Theme } from '../../models/themes.model';
import { ThemeState } from '../reducers/theme.reducer';

export const selectThemeState = (store: AppState): ThemeState => store.theme;

export const selectThemes = (store: AppState): Theme[] =>
  selectThemeState(store)?.themes;

export const selectThemesPending = (store: AppState): boolean =>
  selectThemeState(store)?.loading;

export const selectThemesError = (store: AppState): boolean =>
  selectThemeState(store)?.error;

export const selectThemeisSelectedID = (store: AppState): string =>
  selectThemeState(store)?.themeSelectedID;

export const selectIsAnyThemeSelected = (store: AppState): boolean =>
  selectThemeState(store)?.themeIsSelected;
