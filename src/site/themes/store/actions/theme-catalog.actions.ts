import {
  ThemeCatalogActionTypes,
  LOAD_THEME_CATALOG,
  LOAD_THEME_CATALOG_SUCCESS,
  LOAD_THEME_CATALOG_FAILURE,
  SAVE_THEME_CATALOG,
} from './theme-catalog.types';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

export const loadThemeCatalog = (): ThemeCatalogActionTypes => ({
  type: LOAD_THEME_CATALOG,
});

export const loadThemeCatalogSuccess = (
  themeCatalog: CatalogSettings
): ThemeCatalogActionTypes => ({
  type: LOAD_THEME_CATALOG_SUCCESS,
  payload: themeCatalog,
});

export const loadThemeCatalogFailure = (errorMsg: string): ThemeCatalogActionTypes => ({
  type: LOAD_THEME_CATALOG_FAILURE,
  payload: errorMsg
});

export const saveThemeCatalog = (
  catalog: CatalogSettings
): ThemeCatalogActionTypes => ({
  type: SAVE_THEME_CATALOG,
  payload: catalog,
});
