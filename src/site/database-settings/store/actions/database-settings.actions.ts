import { DatabaseSettings } from "../../models/database-settings.model";
import {
  DatabaseSettingsActionTypes,
  LOAD_DATABASE_SETTINGS,
  LOAD_DATABASE_SETTINGS_SUCCESS,
  LOAD_DATABASE_SETTINGS_FAILURE,
  SAVE_DATABASE_SETTINGS,
  PUBLISH_DATABASE_SETTINGS,
} from "./database-settings.types";

export const loadDatabaseSettings = (): DatabaseSettingsActionTypes => ({
  type: LOAD_DATABASE_SETTINGS,
});

export const loadDatabaseSettingsSuccess = (
  databaseSettings: DatabaseSettings
): DatabaseSettingsActionTypes => ({
  type: LOAD_DATABASE_SETTINGS_SUCCESS,
  payload: databaseSettings,
});

export const loadDatabaseSettingsFailure = (
  error: string
): DatabaseSettingsActionTypes => ({
  type: LOAD_DATABASE_SETTINGS_FAILURE,
  payload: error,
});

export const saveDatabaseSettings = (
  settings: DatabaseSettings
): DatabaseSettingsActionTypes => ({
  type: SAVE_DATABASE_SETTINGS,
  payload: settings,
});

export const publishDatabaseSettings = (): DatabaseSettingsActionTypes => ({
  type: PUBLISH_DATABASE_SETTINGS,
});
