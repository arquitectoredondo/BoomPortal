import { AppState } from '../../../../core/store/store';
import { PortalJournalPagesDetailsState } from '../reducers/journal-page-details.reducers';
import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { JournalPage } from '../../models/journal-page.model';

export const selectPortalJournalPageDetailsState = (
  store: AppState
): PortalJournalPagesDetailsState => store.journalPageDetails;

export const selectPortalJournalPageDetailsLayout = (
  store: AppState
): ResponsiveLayout => selectPortalJournalPageDetailsState(store)?.pageLayout;

export const selectPortalJournalPageDetails = (store: AppState): JournalPage | undefined =>
  selectPortalJournalPageDetailsState(store)?.pageDetails;

export const selectPortalJournalPageDetailsLoading = (store: AppState): boolean =>
  selectPortalJournalPageDetailsState(store)?.loading;

export const selectPortalJournalPageDetailsError = (store: AppState): boolean =>
  selectPortalJournalPageDetailsState(store)?.error;

export const selectPortalJournalPageDetailsErrorMsg = (store: AppState): string =>
  selectPortalJournalPageDetailsState(store)?.errorMsg;
