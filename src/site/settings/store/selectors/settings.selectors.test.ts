import {
  selectPortalSettingsState,
  selectPortalSettings,
  selectPortalSettingsLoading,
  selectPortalSettingsError,
  selectPortalSettingsErrorMsg,
} from './settings.selectors';

const appState: any = {
  portalSettings: {
    loading: true,
    error: false,
    portalSettings: undefined,
    errorMsg: 'test',
  },
};

describe('settings selectors', () => {
  it('should handle selectPortalSettingsState', () => {
    expect(selectPortalSettingsState(appState)).toEqual({
      loading: true,
      error: false,
      portalSettings: undefined,
      errorMsg: 'test',
    });
  });

  it('should handle selectPortalSettings', () => {
    expect(selectPortalSettings(appState)).toEqual(undefined);
  });

  it('should handle selectPortalSettingsLoading', () => {
    expect(selectPortalSettingsLoading(appState)).toEqual(true);
  });

  it('should handle selectPortalSettingsError', () => {
    expect(selectPortalSettingsError(appState)).toEqual(false);
  });
  it('should handle selectPortalSettingsErrorMsg', () => {
    expect(selectPortalSettingsErrorMsg(appState)).toEqual('test');
  });
});
