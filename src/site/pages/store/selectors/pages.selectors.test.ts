import {
  selectPortalPagesState,
  selectPortalPages,
  selectPortalPagesLoading,
  selectPortalPagesError,
  selectPortalPagesErrorMsg,
} from './pages.selectors';

const appState: any = {
  pages: {
    pages: [],
    loading: false,
    error: true,
    errorMsg: 'e',
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectPortalPagesState(appState)).toEqual({
      pages: [],
      loading: false,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle selectPortalPages', () => {
    expect(selectPortalPages(appState)).toEqual([]);
  });

  it('should handle selectPortalPagesLoading', () => {
    expect(selectPortalPagesLoading(appState)).toEqual(false);
  });

  it('should handle selectPortalPagesError', () => {
    expect(selectPortalPagesError(appState)).toEqual(true);
  });

  it('should handle selectPortalPagesErrorMsg', () => {
    expect(selectPortalPagesErrorMsg(appState)).toEqual('e');
  });
});
