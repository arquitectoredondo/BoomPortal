import { CatalogSettings } from '../../../../shared/models/catalog.model';
export const LOAD_PORTAL_CATALOG: string = '[CATALOG] LOAD_PORTAL_CATALOG';
export const LOAD_PORTAL_CATALOG_SUCCESS: string =
  '[CATALOG] LOAD_PORTAL_CATALOG_SUCCESS';
export const LOAD_PORTAL_CATALOG_FAILURE: string =
  '[CATALOG] LOAD_PORTAL_CATALOG_FAILURE';
export const SAVE_PORTAL_CATALOG: string = '[CATALOG] SAVE_PORTAL_CATALOG';

export interface LoadPortalCatalog {
  type: typeof LOAD_PORTAL_CATALOG;
}

export interface LoadPortalCatalogSuccess {
  type: typeof LOAD_PORTAL_CATALOG_SUCCESS;
  payload: CatalogSettings;
}

export interface LoadPortalCatalogFailure {
  type: typeof LOAD_PORTAL_CATALOG_FAILURE;
  payload: string;
}

export interface SavePortalCatalog {
  type: typeof SAVE_PORTAL_CATALOG;
  payload: CatalogSettings;
}

export type PortalCatalogActionTypes =
  | LoadPortalCatalog
  | LoadPortalCatalogSuccess
  | LoadPortalCatalogFailure
  | SavePortalCatalog;
