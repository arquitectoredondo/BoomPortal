import { DatabaseSettings } from "../../models/database-settings.model";
import {
  DatabaseSettingsActionTypes,
  PUBLISH_DATABASE_SETTINGS,
  SaveDatabaseSettings,
  SAVE_DATABASE_SETTINGS,
  LOAD_DATABASE_SETTINGS_FAILURE,
  LoadDatabaseSettingsSuccess,
  LOAD_DATABASE_SETTINGS_SUCCESS,
  LOAD_DATABASE_SETTINGS,
  LoadDatabaseSettingsFailure,
} from "../actions/database-settings.types";

export interface DatabaseSettingsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  databaseSettings: DatabaseSettings | undefined;
}

const initialState: DatabaseSettingsState = {
  loading: false,
  error: false,
  errorMsg: "",
  databaseSettings: undefined,
};

const databaseSettingsReducer = (
  state: DatabaseSettingsState = initialState,
  action: DatabaseSettingsActionTypes
) => {
  switch (action.type) {
    case LOAD_DATABASE_SETTINGS:
    case PUBLISH_DATABASE_SETTINGS: {

      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    }

    case LOAD_DATABASE_SETTINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        databaseSettings: (action as LoadDatabaseSettingsSuccess).payload,
        errorMsg: "",
      };
    }

    case LOAD_DATABASE_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadDatabaseSettingsFailure).payload,
      };
    }

    case SAVE_DATABASE_SETTINGS: {
      return {
        ...state,
        databaseSettings: (action as SaveDatabaseSettings).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default databaseSettingsReducer;
