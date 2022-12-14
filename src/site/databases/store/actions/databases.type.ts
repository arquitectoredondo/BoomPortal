import { Database } from "../../../site/models/database.model";
export const LOAD_DATABASES: string = "[ADMIN DATABASE] LOAD_DATABASES";
export const LOAD_DATABASES_SUCCESS: string =
  "[ADMIN DATABASE] LOAD_DATABASES_SUCCESS";
export const LOAD_DATABASES_FAILURE: string =
  "[ADMIN DATABASE] LOAD_DATABASES_FAILURE";
export const OPEN_CLOSE_CREATE_DIALOG: string =
  "[ADMIN DATABASE] OPEN_CLOSE_CREATE_DIALOG";

export interface LoadDatabasesSuccess {
  type: typeof LOAD_DATABASES_SUCCESS;
  payload: Database[];
}

export interface LoadDatabasesFailure {
  type: typeof LOAD_DATABASES_FAILURE;
  payload: string;
}

export interface LoadDatabases {
  type: typeof LOAD_DATABASES;
}

export interface OpenCloseCreateDialog {
  type: typeof OPEN_CLOSE_CREATE_DIALOG;
  payload: boolean;
}

export type DatabaseActionTypes =
  | LoadDatabasesSuccess
  | LoadDatabasesFailure
  | LoadDatabases
  | OpenCloseCreateDialog;
