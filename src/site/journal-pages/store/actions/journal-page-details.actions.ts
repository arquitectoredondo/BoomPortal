import {
  PortalJournalPagesDetailsActionTypes,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
} from './journal-page-details.types';
import { JournalPageDetails } from '../../models/journal-page.model';

export const loadPortalJournalPageDetails = (): PortalJournalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES_DETAILS,
});

export const loadPortalJournalPageDetailsSuccess = (
  pageDetails: JournalPageDetails
): PortalJournalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  payload: pageDetails,
});

export const loadPortalJournalPageDetailsFailure = (
  error: string
): PortalJournalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
  payload: error,
});

export const updatePortalJournalPageDetails = (): PortalJournalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_JOURNAL_PAGES_DETAILS,
});

export const updatePortalJournalPageDetailsSuccess = (
  newData: JournalPageDetails
): PortalJournalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  payload: newData,
});

export const updatePortalJournalPageDetailsFailure = (
  error: string
): PortalJournalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
  payload: error,
});
