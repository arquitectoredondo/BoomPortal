import { AppState } from '../../../../core/store/store';
import { PortalCatalogState } from '../reducers/portal-catalog.reducer';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

export const selectPortalCatalogState = (store: AppState): PortalCatalogState =>
  store.portalCatalog;

export const selectPortalCatalog = (
  store: AppState
): CatalogSettings | undefined => selectPortalCatalogState(store).portalCatalog;

export const selectPortalCatalogLoading = (store: AppState): any =>
  selectPortalCatalogState(store).loading;

export const selectPortalCatalogError = (store: AppState): any =>
  selectPortalCatalogState(store).error;

export const selectPortalCatalogErrorMsg = (store: AppState): any =>
  selectPortalCatalogState(store).errorMsg;
