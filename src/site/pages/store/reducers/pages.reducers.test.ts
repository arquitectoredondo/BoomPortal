import reducer, { PortalPagesState } from './pages.reducers';
import {
  loadPortalPages,
  loadPortalPagesSuccess,
  loadPortalPagesFailure,
} from '../actions/pages.actions';

const initialState: PortalPagesState = {
  loading: false,
  error: false,
  errorMsg: '',
  pages: [],
};

describe('pages reducer', () => {
  it('should handle LOAD_PORTAL_PAGES', () => {
    expect(reducer(initialState, loadPortalPages())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_PORTAL_PAGES_SUCCESS', () => {
    expect(reducer(initialState, loadPortalPagesSuccess([]))).toEqual({
      ...initialState,
      pages: [],
    });
  });

  it('should handle LOAD_PORTAL_PAGES_FAILURE', () => {
    expect(reducer(initialState, loadPortalPagesFailure('e'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });
});
