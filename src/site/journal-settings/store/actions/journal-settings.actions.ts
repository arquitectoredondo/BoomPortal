import { JournalSettings } from '../../models/journal-settings.model';
import {
  JournalSettingsActionTypes,
  LOAD_JOURNAL_SETTINGS,
  LOAD_JOURNAL_SETTINGS_SUCCESS,
  LOAD_JOURNAL_SETTINGS_FAILURE,
  SAVE_JOURNAL_SETTINGS,
  PUBLISH_JOURNAL_SETTINGS
} from './journal-settings.types';

export const loadJournalSettings = (): JournalSettingsActionTypes => ({
  type: LOAD_JOURNAL_SETTINGS
});

export const loadJournalSettingsSuccess = (
  journalSettings: JournalSettings
): JournalSettingsActionTypes => ({
  type: LOAD_JOURNAL_SETTINGS_SUCCESS,
  payload: journalSettings
});

export const loadJournalSettingsFailure = (error: string): JournalSettingsActionTypes => ({
  type: LOAD_JOURNAL_SETTINGS_FAILURE,
  payload: error
});

export const saveJournalSettings = (
  settings: JournalSettings
): JournalSettingsActionTypes => ({
  type: SAVE_JOURNAL_SETTINGS,
  payload: settings
});

export const publishJournalSettings = (): JournalSettingsActionTypes => ({
  type: PUBLISH_JOURNAL_SETTINGS
});
