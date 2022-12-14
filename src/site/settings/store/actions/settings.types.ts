import { PortalSettings } from '../../models/portal-settings.model';

export const LOAD_PORTAL_SETTINGS: string = '[SETTINGS] LOAD_PORTAL_SETTINGS';
export const LOAD_PORTAL_SETTINGS_SUCCESS: string =
  '[SETTINGS] LOAD_PORTAL_SETTINGS_SUCCESS';
export const LOAD_PORTAL_SETTINGS_FAILURE: string =
  '[SETTINGS] LOAD_PORTAL_SETTINGS_FAILURE';

export const PUBLISH_PORTAL_SETTINGS: string =
  '[SETTINGS] PUBLISH_PORTAL_SETTINGS';

export const SAVE_PORTAL_SETTINGS: string = '[SETTINGS] SAVE_PORTAL_SETTINGS';

export interface LoadPortalSettings {
  type: typeof LOAD_PORTAL_SETTINGS;
}

export interface LoadPortalSettingsSuccess {
  type: typeof LOAD_PORTAL_SETTINGS_SUCCESS;
  payload: PortalSettings;
}

export interface LoadPortalSettingsFailure {
  type: typeof LOAD_PORTAL_SETTINGS_FAILURE;
  payload?: string;
}

export interface PublishPortalSettings {
  type: typeof PUBLISH_PORTAL_SETTINGS;
}

export interface SavePortalSettings {
  type: typeof SAVE_PORTAL_SETTINGS;
  payload: PortalSettings;
}

export type PortalSettingsActionTypes =
  | LoadPortalSettings
  | LoadPortalSettingsSuccess
  | LoadPortalSettingsFailure
  | SavePortalSettings
  | PublishPortalSettings;
