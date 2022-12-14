import { JournalPageDetails } from '../../models/journal-page.model';

export const LOAD_PORTAL_JOURNAL_PAGES_DETAILS: string =
  '[JOURNAL PAGES] LOAD_PORTAL_JOURNAL_PAGES_DETAILS';
export const LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS: string =
  '[JOURNAL PAGES] LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS';
export const LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE: string =
  '[JOURNAL PAGES] LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE';

export const UPDATE_PORTAL_JOURNAL_PAGES_DETAILS: string =
  '[JOURNAL PAGES] UPDATE_PORTAL_JOURNAL_PAGES_DETAILS';
export const UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS: string =
  '[JOURNAL PAGES] UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS';
export const UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE: string =
  '[JOURNAL PAGES] UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE';

export interface LoadPortalJournalPagesDetails {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES_DETAILS;
}

export interface LoadPortalJournalPagesDetailsSuccess {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS;
  payload: JournalPageDetails;
}

export interface LoadPortalJournalPagesDetailsFailure {
  type: typeof LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE;
  payload: string;
}

export interface UpdatePortalJournalPagesDetails {
  type: typeof UPDATE_PORTAL_JOURNAL_PAGES_DETAILS;
}

export interface UpdatePortalJournalPagesDetailsSuccess {
  type: typeof UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS;
  payload: JournalPageDetails;
}

export interface UpdatePortalJournalPagesDetailsFailure {
  type: typeof UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE;
  payload: string;
}

export type PortalJournalPagesDetailsActionTypes =
  | LoadPortalJournalPagesDetails
  | LoadPortalJournalPagesDetailsSuccess
  | LoadPortalJournalPagesDetailsFailure
  | UpdatePortalJournalPagesDetails
  | UpdatePortalJournalPagesDetailsSuccess
  | UpdatePortalJournalPagesDetailsFailure;
