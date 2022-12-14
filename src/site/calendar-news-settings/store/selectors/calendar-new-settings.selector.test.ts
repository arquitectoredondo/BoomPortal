import {
  selectCalendarNewSettingsState,
  selectCalendarNewSettings,
  selectCalendarNewSettingsLoading,
  selectCalendarNewSettingsError,
  selectCalendarNewSettingsErrorMsg,
} from './calendar-new-settings.selectors';

const appState: any = {
  calendarNewSettings: {
    loading: false,
    error: false,
    errorMsg: 'e',
    calendarNewSettings: undefined,
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectCalendarNewSettingsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: 'e',
      calendarNewSettings: undefined,
    });
  });

  it('should handle selectCalendarNewSettings', () => {
    expect(selectCalendarNewSettings(appState)).toEqual(undefined);
  });

  it('should handle selectCalendarNewSettingsLoading', () => {
    expect(selectCalendarNewSettingsLoading(appState)).toEqual(false);
  });

  it('should handle selectCalendarNewSettingsError', () => {
    expect(selectCalendarNewSettingsError(appState)).toEqual(false);
  });

  it('should handle selectCalendarNewSettingsErrorMsg', () => {
    expect(selectCalendarNewSettingsErrorMsg(appState)).toEqual('e');
  });
});
