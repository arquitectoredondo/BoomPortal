export const LOAD_PORTAL_JOURNAL_PAGES: string =
  '[JOURNAL_PAGES] LOAD_PORTAL_JOURNAL_PAGES';
export const LOAD_PORTAL_JOURNAL_PAGES_SUCCESS: string =
  '[JOURNAL_PAGES] LOAD_PORTAL_JOURNAL_PAGES_SUCCESS';
export const LOAD_PORTAL_JOURNAL_PAGES_FAILURE: string =
  '[JOURNAL_PAGES] LOAD_PORTAL_JOURNAL_PAGES_FAILURE';

export interface LoadPortalJournalPages {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES;
}

export interface LoadPortalJournalPagesSuccess {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES_SUCCESS;
  payload: any;
}

export interface LoadPortalJournalPagesFailure {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES_FAILURE;
  payload: string;
}

export type PortalJournalPagesActionTypes =
  | LoadPortalJournalPages
  | LoadPortalJournalPagesSuccess
  | LoadPortalJournalPagesFailure;
