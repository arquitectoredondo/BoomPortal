import reducer from './journal-settings.reducer';
import { JournalSettings } from '../../models/journal-settings.model';
import { JournalSettingsState } from './journal-settings.reducer';
import {
  loadJournalSettings,
  loadJournalSettingsSuccess,
  loadJournalSettingsFailure,
  saveJournalSettings,
  publishJournalSettings,
} from '../actions/journal-settings.actions';

const initialState: JournalSettingsState = {
  loading: false,
  error: false,
  journalSettings: undefined,
  errorMsg: '',
};

const journalSettingsMock: JournalSettings = {
  uuid: '1',
  canRevert: false,
  editedBy: 'person',
  name: 'name',
  menuItems: [],
  colour: '#000',
  visibility: true,
};

describe('Journal settings reducer', () => {
  it('should handle LOAD_JOURNAL_SETTINGS', () => {
    expect(reducer(initialState, loadJournalSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      journalSettings: undefined,
    });
  });

  it('should handle LOAD_JOURNAL_SETTINGS_SUCCESS', () => {
    expect(
      reducer(initialState, loadJournalSettingsSuccess(journalSettingsMock))
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      journalSettings: journalSettingsMock,
    });
  });

  it('should handle LOAD_JOURNAL_SETTINGS_FAILURE', () => {
    expect(reducer(initialState, loadJournalSettingsFailure('error'))).toEqual({
      ...initialState,
      loading: false,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle SAVE_JOURNAL_SETTINGS', () => {
    expect(
      reducer(initialState, saveJournalSettings(journalSettingsMock))
    ).toEqual({
      ...initialState,
      journalSettings: journalSettingsMock,
    });
  });

  it('should handle PUBLISH_JOURNAL_SETTINGS', () => {
    expect(reducer(initialState, publishJournalSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });
});
