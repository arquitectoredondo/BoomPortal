import { Database } from "../../../site/models/database.model";
import {
  DatabaseActionTypes,
  LOAD_DATABASES,
  LOAD_DATABASES_FAILURE,
  LOAD_DATABASES_SUCCESS,
  OPEN_CLOSE_CREATE_DIALOG,
  OpenCloseCreateDialog,
  LoadDatabasesSuccess,
  LoadDatabasesFailure,
} from "../actions/databases.type";

export interface DatabaseState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
  databases: Database[];
}

const initialState: DatabaseState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: "",
  databases: [],
};

const databaseReducer = (
  state: DatabaseState = initialState,
  action: DatabaseActionTypes
) => {
  switch (action.type) {
    case LOAD_DATABASES: {
      return {
        ...state,
        loading: true,
        error: false,
        databases: [],
        errorMsg: "",
      };
    }
    case LOAD_DATABASES_SUCCESS: {
      const payload: Database[] = (action as LoadDatabasesSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        databases: payload,
        errorMsg: "",
      };
    }
    case LOAD_DATABASES_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
        databases: [],
        errorMsg: (action as LoadDatabasesFailure).payload,
      };
    }

    case OPEN_CLOSE_CREATE_DIALOG: {
      return {
        ...state,
        dialogOpen: (action as OpenCloseCreateDialog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default databaseReducer;
