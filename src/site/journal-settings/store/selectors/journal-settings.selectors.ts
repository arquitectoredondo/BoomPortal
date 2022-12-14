import { AppState } from '../../../../core/store/store';
import { JournalSettingsState } from '../reducers/journal-settings.reducer';
import { JournalSettings } from '../../models/journal-settings.model';

export const selectJournalSettingsState = (
  store: AppState
): JournalSettingsState => store.journalSettings;

export const selectJournalSettings = (
  store: AppState
): JournalSettings | undefined =>
  selectJournalSettingsState(store).journalSettings;

export const selectJournalSettingsLoading = (store: AppState): boolean =>
  selectJournalSettingsState(store).loading;

export const selectJournalSettingsError = (store: AppState): boolean =>
  selectJournalSettingsState(store).error;

export const selectJournalSettingsErrorMsg = (store: AppState): string =>
  selectJournalSettingsState(store).errorMsg;
