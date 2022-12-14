import {
  selectPortalJournalPageDetailsState,
  selectPortalJournalPageDetailsLayout,
  selectPortalJournalPageDetailsLoading,
  selectPortalJournalPageDetailsError,
  selectPortalJournalPageDetailsErrorMsg,
  selectPortalJournalPageDetails,
} from './journal-page-details.selectors';

const appState: any = {
  journalPageDetails: {
    loading: false,
    error: false,
    errorMsg: 'e',
    pageLayout: { lg: [] },
    pageDetails: undefined,
  },
};

describe('page details selectors', () => {
  it('should handle selectPortalJournalPageDetailsState', () => {
    expect(selectPortalJournalPageDetailsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: 'e',
      pageLayout: { lg: [] },
      pageDetails: undefined,
    });
  });

  it('should handle selectJournalPageDetailsLayout', () => {
    expect(selectPortalJournalPageDetailsLayout(appState)).toEqual({ lg: [] });
  });

  it('should handle selectJournalPageDetailsLoading', () => {
    expect(selectPortalJournalPageDetailsLoading(appState)).toEqual(false);
  });

  it('should handle selectJournalPageDetailsError', () => {
    expect(selectPortalJournalPageDetailsError(appState)).toEqual(false);
  });

  it('should handle selectJournalPageDetailsErrorMsg', () => {
    expect(selectPortalJournalPageDetailsErrorMsg(appState)).toEqual('e');
  });

  it('should handle selectJournalPageDetailsErrorMsg', () => {
    expect(selectPortalJournalPageDetails(appState)).toEqual(undefined);
  });
});
