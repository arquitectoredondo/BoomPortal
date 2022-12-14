import {
  SAVE_PORTAL_CATALOG,
  LOAD_PORTAL_CATALOG,
  LOAD_PORTAL_CATALOG_SUCCESS,
  LOAD_PORTAL_CATALOG_FAILURE,
  PortalCatalogActionTypes,
} from './portal-catalog.types';
import { CatalogSettings } from '../../../../shared/models/catalog.model';
export const loadPortalCatalog = (): PortalCatalogActionTypes => ({
  type: LOAD_PORTAL_CATALOG,
});

export const loadPortalCatalogSuccess = (
  portalCatalog: CatalogSettings
): PortalCatalogActionTypes => ({
  type: LOAD_PORTAL_CATALOG_SUCCESS,
  payload: portalCatalog,
});

export const loadPortalCatalogFailure = (
  error: string
): PortalCatalogActionTypes => ({
  type: LOAD_PORTAL_CATALOG_FAILURE,
  payload: error,
});

export const savePortalCatalog = (
  catalog: CatalogSettings
): PortalCatalogActionTypes => ({
  type: SAVE_PORTAL_CATALOG,
  payload: catalog,
});
