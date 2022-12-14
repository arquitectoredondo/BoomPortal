import { ThemeSettings } from '../../models/themes.model';

export const LOAD_THEME_SETTINGS: string =
  '[THEME SETTINGS] LOAD_THEME_SETTINGS';
export const RESET_THEME_SETTINGS: string =
  '[THEME SETTINGS] RESET_THEME_SETTINGS';
export const LOAD_THEME_SETTINGS_SUCCESS: string =
  '[THEME SETTINGS] LOAD_THEME_SETTINGS_SUCCESS';
export const LOAD_THEME_SETTINGS_FAILURE: string =
  '[THEME SETTINGS] LOAD_THEME_SETTINGS_FAILURE';
export const SAVE_THEME_SETTINGS: string =
  '[THEME SETTINGS] SAVE_THEME_SETTINGS';

export interface LoadThemeSettings {
  type: typeof LOAD_THEME_SETTINGS;
}
export interface ResetThemeSettings {
  type: typeof RESET_THEME_SETTINGS;
}

export interface LoadThemeSettingsSuccess {
  type: typeof LOAD_THEME_SETTINGS_SUCCESS;
  payload: ThemeSettings;
}

export interface LoadThemeSettingsFailure {
  type: typeof LOAD_THEME_SETTINGS_FAILURE;
  payload: string;
}

export interface SaveThemeSettings {
  type: typeof SAVE_THEME_SETTINGS;
  payload: ThemeSettings;
}

export type ThemeSettingsActionTypes =
  | LoadThemeSettings
  | LoadThemeSettingsSuccess
  | LoadThemeSettingsFailure
  | SaveThemeSettings
  | ResetThemeSettings;
