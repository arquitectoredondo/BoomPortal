import { AppState } from '../../../../core/store/store';
import { ThemeCatalogState } from '../reducers/theme-catalog.reducer';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

export const selectThemeCatalogState = (store: AppState): ThemeCatalogState =>
  store.themeCatalog;

export const selectThemeCatalog = (
  store: AppState
): CatalogSettings | undefined => selectThemeCatalogState(store).themeCatalog;

export const selectThemeCatalogLoading = (store: AppState): any =>
  selectThemeCatalogState(store).loading;

export const selecthemeCatalogError = (store: AppState): any =>
  selectThemeCatalogState(store).error;

export const selectThemeCatalogErrorMsg = (store: AppState): any =>
         selectThemeCatalogState(store).errorMsg;