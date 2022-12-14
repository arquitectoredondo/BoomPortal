import { AppState } from '../../../../core/store/store';
import { JournalState } from '../reducers/journals.reducer';
import { Journal } from '../../../site/models/journal.model';

export const selectJournalsState = (store: AppState): JournalState =>
  store.journals;

export const selectJournals = (store: AppState): Journal[] =>
  selectJournalsState(store)?.journals;

export const selectJournalsPending = (store: AppState): boolean =>
  selectJournalsState(store)?.loading;

export const selectJournalsError = (store: AppState): boolean =>
  selectJournalsState(store)?.error;

export const selectJournalsErrorMsg = (store: AppState): string =>
  selectJournalsState(store)?.errorMsg;

export const selectJournalDialogOpen = (store: AppState): boolean =>
  selectJournalsState(store)?.dialogOpen;
