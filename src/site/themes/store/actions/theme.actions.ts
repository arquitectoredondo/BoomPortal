import { Theme } from '../../models/themes.model';
import {
  ThemeActionTypes,
  LOAD_THEMES,
  LOAD_THEMES_SUCCESS,
  LOAD_THEMES_FAILURE,
  THEME_SELECTED_ID,
  THEME_IS_SELECTED
} from './theme.types';

export const loadThemes = (): ThemeActionTypes => ({
  type: LOAD_THEMES
});

export const loadThemesSuccess = (themes: Theme[]): ThemeActionTypes => ({
  type: LOAD_THEMES_SUCCESS,
  payload: themes
});

export const loadThemesFailure = (): ThemeActionTypes => ({
  type: LOAD_THEMES_FAILURE
});

export const loadThemeSelectedID = (id: string): ThemeActionTypes => ({
  type: THEME_SELECTED_ID,
  payload: id
});

export const themeIsSelected = (isSelected: boolean): ThemeActionTypes => ({
  type: THEME_IS_SELECTED,
  payload: isSelected
});
