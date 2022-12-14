import {
  selectDatabaseSettingsState,
  selectDatabaseSettings,
  selectDatabaseSettingsLoading,
  selectDatabaseSettingsError,
  selectDatabaseSettingsErrorMsg,
} from "./database-settings.selectors";

const appState: any = {
  databaseSettings: {
    loading: false,
    error: false,
    errorMsg: "e",
    databaseSettings: undefined,
  },
};

describe("pages selectors", () => {
  it("should handle selectDatabaseSettingsState", () => {
    expect(selectDatabaseSettingsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: "e",
      databaseSettings: undefined,
    });
  });

  it("should handle selectDatabaseSettings", () => {
    expect(selectDatabaseSettings(appState)).toEqual(undefined);
  });

  it("should handle selectDatabaseSettingsLoading", () => {
    expect(selectDatabaseSettingsLoading(appState)).toEqual(false);
  });

  it("should handle selectDatabaseSettingsError", () => {
    expect(selectDatabaseSettingsError(appState)).toEqual(false);
  });

  it("should handle selectDatabaseSettingsErrorMsg", () => {
    expect(selectDatabaseSettingsErrorMsg(appState)).toEqual("e");
  });
});
