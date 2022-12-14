import {
  PortalSettingsActionTypes,
  LOAD_PORTAL_SETTINGS,
  LOAD_PORTAL_SETTINGS_SUCCESS,
  LOAD_PORTAL_SETTINGS_FAILURE,
  SAVE_PORTAL_SETTINGS,
  PUBLISH_PORTAL_SETTINGS,
} from './settings.types';
import { PortalSettings } from '../../models/portal-settings.model';

export const loadPortalSettings = (): PortalSettingsActionTypes => ({
  type: LOAD_PORTAL_SETTINGS,
});

export const loadPortalSettingsSuccess = (
  portalSettings?: PortalSettings
): PortalSettingsActionTypes => ({
  type: LOAD_PORTAL_SETTINGS_SUCCESS,
  payload: portalSettings,
});

export const loadPortalSettingsFailure = (
  msg?: string
): PortalSettingsActionTypes => ({
  type: LOAD_PORTAL_SETTINGS_FAILURE,
  payload: msg,
});

export const savePortalSettings = (
  settings: PortalSettings
): PortalSettingsActionTypes => ({
  type: SAVE_PORTAL_SETTINGS,
  payload: settings,
});

export const publishPortalSettings = (): PortalSettingsActionTypes => ({
  type: PUBLISH_PORTAL_SETTINGS,
});
