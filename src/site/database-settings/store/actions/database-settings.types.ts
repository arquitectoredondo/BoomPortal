import { DatabaseSettings } from "../../models/database-settings.model";

export const LOAD_DATABASE_SETTINGS: string =
  "[SETTINGS] LOAD_DATABASE_SETTINGS";
export const LOAD_DATABASE_SETTINGS_SUCCESS: string =
  "[SETTINGS] LOAD_DATABASE_SETTINGS_SUCCESS";
export const LOAD_DATABASE_SETTINGS_FAILURE: string =
  "[SETTINGS] LOAD_DATABASE_SETTINGS_FAILURE";

export const PUBLISH_DATABASE_SETTINGS: string =
  "[SETTINGS] PUBLISH_DATABASE_SETTINGS";

export const SAVE_DATABASE_SETTINGS: string =
  "[SETTINGS] SAVE_DATABASE_SETTINGS";

export interface LoadDatabaseSettings {
  type: typeof LOAD_DATABASE_SETTINGS;
}

export interface LoadDatabaseSettingsSuccess {
  type: typeof LOAD_DATABASE_SETTINGS_SUCCESS;
  payload: DatabaseSettings;
}

export interface LoadDatabaseSettingsFailure {
  type: typeof LOAD_DATABASE_SETTINGS_FAILURE;
  payload: string;
}

export interface PublishDatabaseSettings {
  type: typeof PUBLISH_DATABASE_SETTINGS;
}

export interface SaveDatabaseSettings {
  type: typeof SAVE_DATABASE_SETTINGS;
  payload: DatabaseSettings;
}

export type DatabaseSettingsActionTypes =
  | LoadDatabaseSettings
  | LoadDatabaseSettingsSuccess
  | LoadDatabaseSettingsFailure
  | SaveDatabaseSettings
  | PublishDatabaseSettings;
