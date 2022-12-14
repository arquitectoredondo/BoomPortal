import { PageDetails } from '../../../pages/models/page.model';

export const LOAD_THEME_PAGES_DETAILS: string =
  '[PAGES] LOAD_THEME_PAGES_DETAILS';
export const LOAD_THEME_PAGES_DETAILS_SUCCESS: string =
  '[PAGES] LOAD_THEME_PAGES_DETAILS_SUCCESS';
export const LOAD_THEME_PAGES_DETAILS_FAILURE: string =
  '[PAGES] LOAD_THEME_PAGES_DETAILS_FAILURE';

export const UPDATE_THEME_PAGES_DETAILS: string =
  '[PAGES] UPDATE_THEME_PAGES_DETAILS';
export const UPDATE_THEME_PAGES_DETAILS_SUCCESS: string =
  '[PAGES] UPDATE_THEME_PAGES_DETAILS_SUCCESS';
export const UPDATE_THEME_PAGES_DETAILS_FAILURE: string =
  '[PAGES] UPDATE_THEME_PAGES_DETAILS_FAILURE';

export interface LoadThemePagesDetails {
  type: typeof LOAD_THEME_PAGES_DETAILS;
}

export interface LoadThemePagesDetailsSuccess {
  type: typeof LOAD_THEME_PAGES_DETAILS_SUCCESS;
  payload: PageDetails;
}

export interface LoadThemePagesDetailsFailure {
  type: typeof LOAD_THEME_PAGES_DETAILS_FAILURE;
}

export interface UpdateThemePagesDetails {
  type: typeof UPDATE_THEME_PAGES_DETAILS;
}

export interface UpdateThemePagesDetailsSuccess {
  type: typeof UPDATE_THEME_PAGES_DETAILS_SUCCESS;
}

export interface UpdateThemePagesDetailsFailure {
  type: typeof UPDATE_THEME_PAGES_DETAILS_FAILURE;
}

export type ThemePagesDetailsActionTypes =
  | LoadThemePagesDetails
  | LoadThemePagesDetailsSuccess
  | LoadThemePagesDetailsFailure
  | UpdateThemePagesDetails
  | UpdateThemePagesDetailsSuccess
  | UpdateThemePagesDetailsFailure;
