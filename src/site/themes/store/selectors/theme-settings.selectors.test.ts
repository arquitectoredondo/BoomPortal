import {
  selectThemeSettingsState,
  selectThemeSettings,
  selectThemeSettingsLoading,
  selectThemeSettingsError,
} from './theme-settings.selectors';

const appState: any = {
  themeSettings: {
    loading: false,
    error: false,
    themeSettings: undefined,
  },
};

describe('Theme settings selectors', () => {
  it('should handle selectThemeSettingsState', () => {
    expect(selectThemeSettingsState(appState)).toEqual({
      loading: false,
      error: false,
      themeSettings: undefined,
    });
  });

  it('should handle selectThemeSettings', () => {
    expect(selectThemeSettings(appState)).toEqual(undefined);
  });

  it('should handle selectThemeSettingsLoading', () => {
    expect(selectThemeSettingsLoading(appState)).toEqual(false);
  });

  it('should handle selectThemeSettingsError', () => {
    expect(selectThemeSettingsError(appState)).toEqual(false);
  });
});
