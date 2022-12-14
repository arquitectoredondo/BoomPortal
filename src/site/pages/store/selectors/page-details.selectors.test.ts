import {
  selectPortalPageDetailsState,
  selectPortalPageDetailsLayout,
  selectPortalPageDetailsLoading,
  selectPortalPageDetailsError,
  selectPortalPageDetailsErrorMsg,
  selectPortalPageDetails,
} from './page-details.selectors';

const appState: any = {
  pageDetails: {
    loading: false,
    error: false,
    errorMsg: 'e',
    pageLayout: { lg: [] },
    pageDetails: undefined,
  },
};

describe('page details selectors', () => {
  it('should handle selectPortalPageDetailsState', () => {
    expect(selectPortalPageDetailsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: 'e',
      pageLayout: { lg: [] },
      pageDetails: undefined,
    });
  });

  it('should handle selectPageDetailsLayout', () => {
    expect(selectPortalPageDetailsLayout(appState)).toEqual({ lg: [] });
  });

  it('should handle selectPageDetailsLoading', () => {
    expect(selectPortalPageDetailsLoading(appState)).toEqual(false);
  });

  it('should handle selectPageDetailsError', () => {
    expect(selectPortalPageDetailsError(appState)).toEqual(false);
  });

  it('should handle selectPageDetailsErrorMsg', () => {
    expect(selectPortalPageDetailsErrorMsg(appState)).toEqual('e');
  });

  it('should handle selectPageDetailsErrorMsg', () => {
    expect(selectPortalPageDetails(appState)).toEqual(undefined);
  });
});
