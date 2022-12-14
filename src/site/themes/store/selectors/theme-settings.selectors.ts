import { AppState } from '../../../../core/store/store';
import { ThemeSettings } from '../../models/themes.model';
import { ThemeSettingsState } from '../reducers/theme-settings.reducer';

export const selectThemeSettingsState = (store: AppState): ThemeSettingsState =>
  store.themeSettings;

export const selectThemeSettings = (
  store: AppState
): ThemeSettings | undefined => selectThemeSettingsState(store).themeSettings;

export const selectThemeSettingsLoading = (store: AppState): any =>
  selectThemeSettingsState(store).loading;

export const selectThemeSettingsError = (store: AppState): any =>
  selectThemeSettingsState(store).error;
