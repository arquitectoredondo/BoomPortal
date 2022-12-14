import { CatalogSettings } from '../../../../shared/models/catalog.model';

export const LOAD_THEME_CATALOG: string = '[THEME CATALOG] LOAD_THEME_CATALOG';
export const LOAD_THEME_CATALOG_SUCCESS: string =
  '[THEME CATALOG] LOAD_THEME_CATALOG_SUCCESS';
export const LOAD_THEME_CATALOG_FAILURE: string =
  '[THEME CATALOG] LOAD_THEME_CATALOG_FAILURE';
export const SAVE_THEME_CATALOG: string = '[THEME CATALOG] SAVE_THEME_CATALOG';

export interface LoadThemeCatalog {
  type: typeof LOAD_THEME_CATALOG;
}

export interface LoadThemeCatalogSuccess {
  type: typeof LOAD_THEME_CATALOG_SUCCESS;
  payload: CatalogSettings;
}

export interface LoadThemeCatalogFailure {
  type: typeof LOAD_THEME_CATALOG_FAILURE;
  payload: string;
}

export interface SaveThemeCatalog {
  type: typeof SAVE_THEME_CATALOG;
  payload: CatalogSettings;
}

export type ThemeCatalogActionTypes =
  | LoadThemeCatalog
  | LoadThemeCatalogSuccess
  | LoadThemeCatalogFailure
  | SaveThemeCatalog;
