import {
  ThemePagesActionTypes,
  LOAD_THEME_PAGES,
  LOAD_THEME_PAGES_SUCCESS,
  LOAD_THEME_PAGES_FAILURE,
} from './theme-pages.types';

export const loadThemePages = (): ThemePagesActionTypes => ({
  type: LOAD_THEME_PAGES,
});

export const loadThemePagesSuccess = (pages: any[]): ThemePagesActionTypes => ({
  type: LOAD_THEME_PAGES_SUCCESS,
  payload: pages,
});

export const loadThemePagesFailure = (): ThemePagesActionTypes => ({
  type: LOAD_THEME_PAGES_FAILURE,
});
