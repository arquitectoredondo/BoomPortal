import {
  selectThemeCatalogState,
  selectThemeCatalog,
  selectThemeCatalogLoading,
  selecthemeCatalogError,
} from './theme-catalog.selectors';

const appState: any = {
  themeCatalog: {
    loading: false,
    error: false,
    themeCatalog: undefined,
  },
};

describe('Theme catalog selectors', () => {
  it('should handle selectThemeCatalogState', () => {
    expect(selectThemeCatalogState(appState)).toEqual({
      loading: false,
      error: false,
      portalCatalog: undefined,
    });
  });

  it('should handle selectThemeCatalog', () => {
    expect(selectThemeCatalog(appState)).toEqual(undefined);
  });

  it('should handle selectThemeCatalogLoading', () => {
    expect(selectThemeCatalogLoading(appState)).toEqual(false);
  });

  it('should handle selecthemeCatalogError', () => {
    expect(selecthemeCatalogError(appState)).toEqual(false);
  });
});
