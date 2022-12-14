import { AppState } from "../../../../core/store/store";
import { DatabaseState } from "../reducers/databases.reducer";
import { Database } from "../../../site/models/database.model";

export const selectDatabasesState = (store: AppState): DatabaseState =>
  store.databases;

export const selectDatabases = (store: AppState): Database[] =>
  selectDatabasesState(store)?.databases;

export const selectDatabasesPending = (store: AppState): boolean =>
  selectDatabasesState(store)?.loading;

export const selectDatabasesError = (store: AppState): boolean =>
  selectDatabasesState(store)?.error;

export const selectDatabasesErrorMsg = (store: AppState): string =>
  selectDatabasesState(store)?.errorMsg;

export const selectDatabaseDialogOpen = (store: AppState): boolean =>
  selectDatabasesState(store)?.dialogOpen;
