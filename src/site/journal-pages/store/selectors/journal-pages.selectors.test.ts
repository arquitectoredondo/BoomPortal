import {
  selectPortalJournalPagesState,
  selectPortalJournalPages,
  selectPortalJournalPagesLoading,
  selectPortalJournalPagesError,
  selectPortalJournalPagesErrorMsg,
} from './journal-pages.selectors';

const appState: any = {
  journalPages: {
    pages: [],
    loading: false,
    error: true,
    errorMsg: 'e',
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalJournalPagesState', () => {
    expect(selectPortalJournalPagesState(appState)).toEqual({
      pages: [],
      loading: false,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle selectPortalJournalPages', () => {
    expect(selectPortalJournalPages(appState)).toEqual([]);
  });

  it('should handle selectPortalJournalPagesLoading', () => {
    expect(selectPortalJournalPagesLoading(appState)).toEqual(false);
  });

  it('should handle selectPortalJournalPagesError', () => {
    expect(selectPortalJournalPagesError(appState)).toEqual(true);
  });

  it('should handle selectPortalJournalPagesErrorMsg', () => {
    expect(selectPortalJournalPagesErrorMsg(appState)).toEqual('e');
  });
});
