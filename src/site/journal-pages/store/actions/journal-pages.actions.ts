import {
  PortalJournalPagesActionTypes,
  LOAD_PORTAL_JOURNAL_PAGES,
  LOAD_PORTAL_JOURNAL_PAGES_SUCCESS,
  LOAD_PORTAL_JOURNAL_PAGES_FAILURE,
} from './journal-pages.types';

export const loadPortalJournalPages = (): PortalJournalPagesActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES,
});

export const loadPortalJournalPagesSuccess = (
  pages: any
): PortalJournalPagesActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES_SUCCESS,
  payload: pages,
});

export const loadPortalJournalPagesFailure = (
  error: string
): PortalJournalPagesActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES_FAILURE,
  payload: error,
});
