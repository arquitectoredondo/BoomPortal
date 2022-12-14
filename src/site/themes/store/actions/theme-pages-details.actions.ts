import {
  ThemePagesDetailsActionTypes,
  LOAD_THEME_PAGES_DETAILS,
  LOAD_THEME_PAGES_DETAILS_SUCCESS,
  LOAD_THEME_PAGES_DETAILS_FAILURE,
  UPDATE_THEME_PAGES_DETAILS,
  UPDATE_THEME_PAGES_DETAILS_SUCCESS,
  UPDATE_THEME_PAGES_DETAILS_FAILURE,
} from './theme-pages-details.types';
import { PageDetails } from '../../../pages/models/page.model';

export const loadThemePageDetails = (): ThemePagesDetailsActionTypes => ({
  type: LOAD_THEME_PAGES_DETAILS,
});

export const loadThemePageDetailsSuccess = (
  pageDetails: PageDetails
): ThemePagesDetailsActionTypes => ({
  type: LOAD_THEME_PAGES_DETAILS_SUCCESS,
  payload: pageDetails,
});

export const loadThemePageDetailsFailure = (): ThemePagesDetailsActionTypes => ({
  type: LOAD_THEME_PAGES_DETAILS_FAILURE,
});

export const updateThemePageDetails = (): ThemePagesDetailsActionTypes => ({
  type: UPDATE_THEME_PAGES_DETAILS,
});

export const updateThemePageDetailsSuccess = (): ThemePagesDetailsActionTypes => ({
  type: UPDATE_THEME_PAGES_DETAILS_SUCCESS,
});

export const updateThemePageDetailsFailure = (): ThemePagesDetailsActionTypes => ({
  type: UPDATE_THEME_PAGES_DETAILS_FAILURE,
});
