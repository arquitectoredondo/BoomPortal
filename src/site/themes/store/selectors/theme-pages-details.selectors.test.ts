import {
  selectThemePageDetailsState,
  selectThemePageDetailsLayout,
  selectThemePageDetailsLoading,
  selectThemePageDetailsError,
  selectThemePageDetails
} from './theme-pages-details.selectors';

const appState: any = {
  themePageDetails: {
    loading: false,
    error: false,
    pageLayout: { lg: [] },
    pageDetails:undefined
  },
};

describe('theme page details selectors', () => {
  it('should handle selectThemePageDetailsState', () => {
    expect(selectThemePageDetailsState(appState)).toEqual({
      loading: false,
      error: false,
      pageLayout: { lg: [] },
      pageDetails:undefined
    });
  });

  it('should handle selectPageDetailsLayout', () => {
    expect(selectThemePageDetailsLayout(appState)).toEqual({ lg: [] });
  });

  it('should handle selectPageDetailsLoading', () => {
    expect(selectThemePageDetailsLoading(appState)).toEqual(false);
  });

  it('should handle selectPageDetailsError', () => {
    expect(selectThemePageDetailsError(appState)).toEqual(false);
  });

  it('should handle selectPageDetailsError', () => {
    expect(selectThemePageDetails(appState)).toEqual(undefined);
  });
});
