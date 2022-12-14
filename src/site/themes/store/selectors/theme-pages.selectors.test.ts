import {
  selectThemePages,
  selectThemePagesPending,
  selectThemePagesError,
  selectThemePagesState,
} from './theme-pages.selectors';

const appState: any = {
  themePages: {
    themePages: [],
    loading: false,
    error: true,
  },
};

describe('Theme Pages selectors', () => {
  it('should handle selectThemePagesState', () => {
    expect(selectThemePagesState(appState)).toEqual({
      themePages: [],
      loading: false,
      error: true,
    });
  });

  it('should handle selectThemePages', () => {
    expect(selectThemePages(appState)).toEqual([]);
  });

  it('should handle selectThemePagesPending', () => {
    expect(selectThemePagesPending(appState)).toEqual(false);
  });

  it('should handle selectThemePagesError', () => {
    expect(selectThemePagesError(appState)).toEqual(true);
  });
});
