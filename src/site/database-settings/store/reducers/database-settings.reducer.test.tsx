import reducer from "./database-settings.reducer";
import { DatabaseSettings } from "../../models/database-settings.model";
import { DatabaseSettingsState } from "./database-settings.reducer";
import {
  loadDatabaseSettings,
  loadDatabaseSettingsSuccess,
  loadDatabaseSettingsFailure,
  saveDatabaseSettings,
  publishDatabaseSettings,
} from "../actions/database-settings.actions";

const initialState: DatabaseSettingsState = {
  loading: false,
  error: false,
  databaseSettings: undefined,
  errorMsg: "",
};

const databaseSettingsMock: DatabaseSettings = {
  uuid: "1",
  canRevert: false,
  editedBy: "person",
  name: "name",
  menuItems: [],
  colour: "#000",
  visibility: true,
};

describe("Database settings reducer", () => {
  it("should handle LOAD_DATABASE_SETTINGS", () => {
    expect(reducer(initialState, loadDatabaseSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      databaseSettings: undefined,
    });
  });

  it("should handle LOAD_DATABASE_SETTINGS_SUCCESS", () => {
    expect(
      reducer(initialState, loadDatabaseSettingsSuccess(databaseSettingsMock))
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      databaseSettings: databaseSettingsMock,
    });
  });

  it("should handle LOAD_DATABASE_SETTINGS_FAILURE", () => {
    expect(reducer(initialState, loadDatabaseSettingsFailure("error"))).toEqual(
      {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: "error",
      }
    );
  });

  it("should handle SAVE_DATABASE_SETTINGS", () => {
    expect(
      reducer(initialState, saveDatabaseSettings(databaseSettingsMock))
    ).toEqual({
      ...initialState,
      databaseSettings: databaseSettingsMock,
    });
  });

  it("should handle PUBLISH_DATABASE_SETTINGS", () => {
    expect(reducer(initialState, publishDatabaseSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });
});
