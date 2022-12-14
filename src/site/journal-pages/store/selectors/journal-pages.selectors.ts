import { AppState } from '../../../../core/store/store';
import { PortalJournalPagesState } from '../reducers/journal-pages.reducers';

export const selectPortalJournalPagesState = (store: AppState): PortalJournalPagesState =>
  store.journalPages;

export const selectPortalJournalPages = (store: AppState): any[] =>
  selectPortalJournalPagesState(store).pages;

export const selectPortalJournalPagesLoading = (store: AppState): boolean =>
  selectPortalJournalPagesState(store).loading;

export const selectPortalJournalPagesError = (store: AppState): boolean =>
  selectPortalJournalPagesState(store).error;

export const selectPortalJournalPagesErrorMsg = (store: AppState): string =>
  selectPortalJournalPagesState(store).errorMsg;
