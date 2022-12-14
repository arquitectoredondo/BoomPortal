import { AppState } from '../../../../core/store/store';
import { PortalSettingsState } from '../reducers/settings.reducers';
import { PortalSettings } from '../../models/portal-settings.model';

export const selectPortalSettingsState = (
  store: AppState
): PortalSettingsState => store.portalSettings;

export const selectPortalSettings = (
  store: AppState
): PortalSettings | undefined =>
  selectPortalSettingsState(store).portalSettings;

export const selectPortalSettingsLoading = (store: AppState): any =>
  selectPortalSettingsState(store).loading;

export const selectPortalSettingsError = (store: AppState): any =>
  selectPortalSettingsState(store).error;

export const selectPortalSettingsErrorMsg = (store: AppState): string =>
  selectPortalSettingsState(store).errorMsg;
