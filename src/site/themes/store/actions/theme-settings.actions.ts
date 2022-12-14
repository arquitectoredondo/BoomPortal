import {
  ThemeSettingsActionTypes,
  LOAD_THEME_SETTINGS,
  RESET_THEME_SETTINGS,
  LOAD_THEME_SETTINGS_SUCCESS,
  LOAD_THEME_SETTINGS_FAILURE,
  SAVE_THEME_SETTINGS,
} from './theme-settings.types';
import { ThemeSettings } from '../../models/themes.model';

export const loadThemeSettings = (): ThemeSettingsActionTypes => ({
  type: LOAD_THEME_SETTINGS,
});
export const resetThemeSettings = (): ThemeSettingsActionTypes => ({
  type: RESET_THEME_SETTINGS,
});

export const loadThemeSettingsSuccess = (
  themeSettings: ThemeSettings
): ThemeSettingsActionTypes => ({
  type: LOAD_THEME_SETTINGS_SUCCESS,
  payload: themeSettings,
});

export const loadThemeSettingsFailure = (errorMsg: string): ThemeSettingsActionTypes => ({
  type: LOAD_THEME_SETTINGS_FAILURE,
  payload: errorMsg
});

export const saveThemeSettings = (
  themeSettings: ThemeSettings
): ThemeSettingsActionTypes => ({
  type: SAVE_THEME_SETTINGS,
  payload: themeSettings,
});
