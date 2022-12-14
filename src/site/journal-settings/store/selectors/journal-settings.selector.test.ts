import {
  selectJournalSettingsState,
  selectJournalSettings,
  selectJournalSettingsLoading,
  selectJournalSettingsError,
  selectJournalSettingsErrorMsg,
} from './journal-settings.selectors';

const appState: any = {
  journalSettings: {
    loading: false,
    error: false,
    errorMsg: 'e',
    journalSettings: undefined,
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectJournalSettingsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: 'e',
      journalSettings: undefined,
    });
  });

  it('should handle selectJournalSettings', () => {
    expect(selectJournalSettings(appState)).toEqual(undefined);
  });

  it('should handle selectJournalSettingsLoading', () => {
    expect(selectJournalSettingsLoading(appState)).toEqual(false);
  });

  it('should handle selectJournalSettingsError', () => {
    expect(selectJournalSettingsError(appState)).toEqual(false);
  });

  it('should handle selectJournalSettingsErrorMsg', () => {
    expect(selectJournalSettingsErrorMsg(appState)).toEqual('e');
  });
});
