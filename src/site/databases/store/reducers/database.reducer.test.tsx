import reducer, { DatabaseState } from "./databases.reducer";
import {
  loadDatabases,
  openCloseCreationDialog,
  loadDatabasesSuccess,
  loadDatabasesFailure,
} from "../actions/databases.actions";

const initialState: DatabaseState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: "",
  databases: [],
};

describe("Database reducer", () => {
  it("should handle LOAD_DATABASES", () => {
    expect(reducer(initialState, loadDatabases())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle LOAD_DATABASES_SUCCESS", () => {
    expect(reducer(initialState, loadDatabasesSuccess([]))).toEqual({
      ...initialState,
      databases: [],
    });
  });

  it("should handle LOAD_DATABASES_FAILURE", () => {
    expect(reducer(initialState, loadDatabasesFailure("error"))).toEqual({
      ...initialState,
      error: true,
      errorMsg: "error",
    });
  });

  it("should handle OPEN_CLOSE_CREATE_DIALOG", () => {
    expect(reducer(initialState, openCloseCreationDialog(true))).toEqual({
      ...initialState,
      dialogOpen: true,
    });
  });
});
