import reducer, { PortalJournalPagesState } from './journal-pages.reducers';
import { loadPortalJournalPages, loadPortalJournalPagesSuccess, loadPortalJournalPagesFailure } from '../actions/journal-pages.actions';


const initialState: PortalJournalPagesState = {
  loading: false,
  error: false,
  errorMsg: '',
  pages: [],
};

describe('journal pages reducer', () => {
  it('should handle LOAD_PORTAL_JOURNAL_PAGES', () => {
    expect(reducer(initialState, loadPortalJournalPages())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_PORTAL_JOURNAL_PAGES_SUCCESS', () => {
    expect(reducer(initialState, loadPortalJournalPagesSuccess([]))).toEqual({
      ...initialState,
      pages: [],
    });
  });

  it('should handle LOAD_PORTAL_JOURNAL_PAGES_FAILURE', () => {
    expect(reducer(initialState, loadPortalJournalPagesFailure('e'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });
});
