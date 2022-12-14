import { Theme } from '../../models/themes.model';
export const LOAD_THEMES: string = '[ADMIN THEMES] LOAD_THEMES';
export const LOAD_THEMES_FAILURE: string = '[ADMIN THEMES] LOAD_THEMES_FAILURE';
export const LOAD_THEMES_SUCCESS: string = '[ADMIN THEMES] LOAD_THEMES_SUCCESS';
export const THEME_IS_SELECTED: string = '[ADMIN THEMES] THEME IS SELECTED';
export const THEME_SELECTED_ID: string = '[ADMIN THEMES] THEME_SELECTED_ID';

export interface ThemeSelectedID {
  type: typeof THEME_SELECTED_ID;
  payload: string;
}

export interface LoadThemesSuccess {
  type: typeof LOAD_THEMES_SUCCESS;
  payload: Theme[];
}

export interface LoadThemesFailure {
  type: typeof LOAD_THEMES_FAILURE;
}

export interface LoadThemes {
  type: typeof LOAD_THEMES;
}

export interface LoadThemeIsSelected {
  type: typeof THEME_IS_SELECTED;
  payload: boolean;
}

export type ThemeActionTypes =
  | LoadThemesSuccess
  | LoadThemesFailure
  | LoadThemes
  | LoadThemeIsSelected
  | ThemeSelectedID;
