import {
  selectJournalsState,
  selectJournalsPending,
  selectJournalsError,
  selectJournals,
  selectJournalDialogOpen,
  selectJournalsErrorMsg,
} from './journals.selectors';

const appState: any = {
  journals: {
    journals: [],
    loading: false,
    error: true,
    errorMsg: 'error',
    dialogOpen: false,
  },
};

describe('Journal selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectJournalsState(appState)).toEqual({
      journals: [],
      loading: false,
      error: true,
      dialogOpen: false,
      errorMsg: 'error',
    });
  });

  it('should handle selectJournals', () => {
    expect(selectJournals(appState)).toEqual([]);
  });

  it('should handle selectJournalsPending', () => {
    expect(selectJournalsPending(appState)).toEqual(false);
  });

  it('should handle selectJournalsError', () => {
    expect(selectJournalsError(appState)).toEqual(true);
  });

  it('should handle selectJournalsErrorMsg', () => {
    expect(selectJournalsErrorMsg(appState)).toEqual('error');
  });

  it('should handle selectJournalDialogOpen', () => {
    expect(selectJournalDialogOpen(appState)).toEqual(false);
  });
});
