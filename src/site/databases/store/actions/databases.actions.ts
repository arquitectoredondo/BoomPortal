import {
  DatabaseActionTypes,
  OPEN_CLOSE_CREATE_DIALOG,
  LOAD_DATABASES_FAILURE,
  LOAD_DATABASES_SUCCESS,
  LOAD_DATABASES,
} from "./databases.type";
import { Database } from "../../../site/models/database.model";

export const loadDatabases = (): DatabaseActionTypes => ({
  type: LOAD_DATABASES,
});

export const loadDatabasesSuccess = (
  databases: Database[]
): DatabaseActionTypes => ({
  type: LOAD_DATABASES_SUCCESS,
  payload: databases,
});

export const loadDatabasesFailure = (error: string): DatabaseActionTypes => ({
  type: LOAD_DATABASES_FAILURE,
  payload: error,
});

export const openCloseCreationDialog = (
  value: boolean
): DatabaseActionTypes => ({
  type: OPEN_CLOSE_CREATE_DIALOG,
  payload: value,
});
