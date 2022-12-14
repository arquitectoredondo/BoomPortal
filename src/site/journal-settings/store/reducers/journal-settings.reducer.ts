import { JournalSettings } from '../../models/journal-settings.model';
import {
  JournalSettingsActionTypes,
  PUBLISH_JOURNAL_SETTINGS,
  SaveJournalSettings,
  SAVE_JOURNAL_SETTINGS,
  LOAD_JOURNAL_SETTINGS_FAILURE,
  LoadJournalSettingsSuccess,
  LOAD_JOURNAL_SETTINGS_SUCCESS,
  LOAD_JOURNAL_SETTINGS,
  LoadJournalSettingsFailure,
} from '../actions/journal-settings.types';

export interface JournalSettingsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  journalSettings: JournalSettings | undefined;
}

const initialState: JournalSettingsState = {
  loading: false,
  error: false,
  errorMsg: '',
  journalSettings: undefined,
};

const journalSettingsReducer = (
  state: JournalSettingsState = initialState,
  action: JournalSettingsActionTypes
) => {
  switch (action.type) {
    case LOAD_JOURNAL_SETTINGS:
    case PUBLISH_JOURNAL_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_JOURNAL_SETTINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        journalSettings: (action as LoadJournalSettingsSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_JOURNAL_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadJournalSettingsFailure).payload,
      };
    }

    case SAVE_JOURNAL_SETTINGS: {
      return {
        ...state,
        journalSettings: (action as SaveJournalSettings).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default journalSettingsReducer;
