import { ThemeSettingsState } from './theme-settings.reducer';
import reducer from './theme-settings.reducer';
import { ThemeSettings } from '../../models/themes.model';
import {
  loadThemeSettings,
  saveThemeSettings,
  loadThemeSettingsFailure,
  loadThemeSettingsSuccess,
  resetThemeSettings,
} from '../actions/theme-settings.actions';

const initialState: ThemeSettingsState = {
  loading: false,
  error: false,
  errorMsg: '',
  themeSettings: undefined,
};

const themeSettingsMock: ThemeSettings = {
  uuid: '1',
  canRevert: false,
  permalink: '',
  menuItems: [],
  homepage: {
    label: '',
    pageId: '',
  },
  previewImage: 'image',
  description: 'description',
  name: 'name',
  visibility: true,
};

describe('Theme settings reducer', () => {
  it('should handle LOAD_THEME_SETTINGS', () => {
    expect(reducer(initialState, loadThemeSettings())).toEqual({
      loading: true,
      error: false,
      errorMsg: '',
      themeSettings: undefined,
    });
  });

  it('should handle LOAD_THEME_SETTINGS_SUCCESS', () => {
    expect(
      reducer(initialState, loadThemeSettingsSuccess(themeSettingsMock))
    ).toEqual({
      ...initialState,
      loading: false,
      errorMsg: '',
      error: false,
      themeSettings: themeSettingsMock,
    });
  });

  it('should handle LOAD_THEME_SETTINGS_FAILURE', () => {
    expect(reducer(initialState, loadThemeSettingsFailure('e'))).toEqual({
      ...initialState,
      loading: false,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle SAVE_THEME_SETTINGS', () => {
    expect(reducer(initialState, saveThemeSettings(themeSettingsMock))).toEqual(
      {
        ...initialState,
        themeSettings: themeSettingsMock,
      }
    );
  });

  it('should handle RESET_THEME_SETTINGS', () => {
    expect(reducer(initialState, resetThemeSettings())).toEqual({
      loading: true,
      error: false,
      errorMsg: '',
      themeSettings: undefined,
    });
  });
});
