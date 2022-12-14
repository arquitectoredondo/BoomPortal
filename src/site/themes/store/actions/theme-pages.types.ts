
export const LOAD_THEME_PAGES: string = '[THEME PAGES] LOAD_THEME_PAGES';
export const LOAD_THEME_PAGES_SUCCESS: string =
  '[THEME PAGES] LOAD_THEME_PAGES_SUCCESS';
export const LOAD_THEME_PAGES_FAILURE: string =
  '[THEME PAGES] LOAD_THEME_PAGES_FAILURE';

export interface LoadThemePages {
  type: typeof LOAD_THEME_PAGES;
}

export interface LoadThemePagesSuccess {
  type: typeof LOAD_THEME_PAGES_SUCCESS;
  payload: any;
}

export interface LoadThemePagesFailure {
  type: typeof LOAD_THEME_PAGES_FAILURE;
}

export type ThemePagesActionTypes =
  | LoadThemePages
  | LoadThemePagesSuccess
  | LoadThemePagesFailure;
