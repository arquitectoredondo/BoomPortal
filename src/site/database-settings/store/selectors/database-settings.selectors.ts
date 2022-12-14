import { AppState } from "../../../../core/store/store";
import { DatabaseSettingsState } from "../reducers/database-settings.reducer";
import { DatabaseSettings } from "../../models/database-settings.model";

export const selectDatabaseSettingsState = (
  store: AppState
): DatabaseSettingsState => store.databaseSettings;

export const selectDatabaseSettings = (
  store: AppState
): DatabaseSettings | undefined =>
  selectDatabaseSettingsState(store).databaseSettings;

export const selectDatabaseSettingsLoading = (store: AppState): boolean =>
  selectDatabaseSettingsState(store).loading;

export const selectDatabaseSettingsError = (store: AppState): boolean =>
  selectDatabaseSettingsState(store).error;

export const selectDatabaseSettingsErrorMsg = (store: AppState): string =>
  selectDatabaseSettingsState(store).errorMsg;
