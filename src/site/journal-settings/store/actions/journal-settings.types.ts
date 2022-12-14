import { JournalSettings } from '../../models/journal-settings.model';

export const LOAD_JOURNAL_SETTINGS: string = '[SETTINGS] LOAD_JOURNAL_SETTINGS';
export const LOAD_JOURNAL_SETTINGS_SUCCESS: string =
  '[SETTINGS] LOAD_JOURNAL_SETTINGS_SUCCESS';
export const LOAD_JOURNAL_SETTINGS_FAILURE: string =
  '[SETTINGS] LOAD_JOURNAL_SETTINGS_FAILURE';

export const PUBLISH_JOURNAL_SETTINGS: string =
  '[SETTINGS] PUBLISH_JOURNAL_SETTINGS';

export const SAVE_JOURNAL_SETTINGS: string = '[SETTINGS] SAVE_JOURNAL_SETTINGS';

export interface LoadJournalSettings {
  type: typeof LOAD_JOURNAL_SETTINGS;
}

export interface LoadJournalSettingsSuccess {
  type: typeof LOAD_JOURNAL_SETTINGS_SUCCESS;
  payload: JournalSettings;
}

export interface LoadJournalSettingsFailure {
  type: typeof LOAD_JOURNAL_SETTINGS_FAILURE;
  payload: string;
}

export interface PublishJournalSettings {
  type: typeof PUBLISH_JOURNAL_SETTINGS;
}

export interface SaveJournalSettings {
  type: typeof SAVE_JOURNAL_SETTINGS;
  payload: JournalSettings;
}

export type JournalSettingsActionTypes =
  | LoadJournalSettings
  | LoadJournalSettingsSuccess
  | LoadJournalSettingsFailure
  | SaveJournalSettings
  | PublishJournalSettings;
