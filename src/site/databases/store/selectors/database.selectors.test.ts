import {
  selectDatabasesState,
  selectDatabasesPending,
  selectDatabasesError,
  selectDatabases,
  selectDatabaseDialogOpen,
  selectDatabasesErrorMsg,
} from "./databases.selectors";

const appState: any = {
  databases: {
    databases: [],
    loading: false,
    error: true,
    errorMsg: "error",
    dialogOpen: false,
  },
};

describe("Databases selectors", () => {
  it("should handle selectDatabasesState", () => {
    expect(selectDatabasesState(appState)).toEqual({
      databases: [],
      loading: false,
      error: true,
      dialogOpen: false,
      errorMsg: "error",
    });
  });

  it("should handle selectDatabases", () => {
    expect(selectDatabases(appState)).toEqual([]);
  });

  it("should handle selectDatabasesPending", () => {
    expect(selectDatabasesPending(appState)).toEqual(false);
  });

  it("should handle selectDatabasesError", () => {
    expect(selectDatabasesError(appState)).toEqual(true);
  });

  it("should handle selectDatabasesErrorMsg", () => {
    expect(selectDatabasesErrorMsg(appState)).toEqual("error");
  });

  it("should handle selectDatabaseDialogOpen", () => {
    expect(selectDatabaseDialogOpen(appState)).toEqual(false);
  });
});
