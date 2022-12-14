import { AppState } from '../../../../core/store/store';
import { Portal } from '../../../site/models/portal.model';
import { PortalState } from '../reducers/portals.reducer';

export const selectPortalsState = (store: AppState): PortalState =>
  store.portals;

export const selectPortals = (store: AppState): Portal[] =>
  selectPortalsState(store)?.portals;

export const selectPortalsPending = (store: AppState): boolean =>
  selectPortalsState(store)?.loading;

export const selectPortalsError = (store: AppState): boolean =>
  selectPortalsState(store)?.error;

export const selectPortalsErrorMsg = (store: AppState): string =>
  selectPortalsState(store)?.errorMsg;

export const selectPortalsDialogOpen = (store: AppState): boolean =>
  selectPortalsState(store)?.dialogOpen;
