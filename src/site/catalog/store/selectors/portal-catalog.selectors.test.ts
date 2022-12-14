import {
  selectPortalCatalogState,
  selectPortalCatalog,
  selectPortalCatalogLoading,
  selectPortalCatalogError,
  selectPortalCatalogErrorMsg,
} from './portal-catalog.selectors';

const appState: any = {
  portalCatalog: {
    loading: false,
    error: false,
    errorMsg: 'error',
    portalCatalog: undefined,
  },
};

describe('Portal catalog selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectPortalCatalogState(appState)).toEqual({
      loading: false,
      error: false,
      portalCatalog: undefined,
      errorMsg: 'error',
    });
  });

  it('should handle selectPortalCatalog', () => {
    expect(selectPortalCatalog(appState)).toEqual(undefined);
  });

  it('should handle selectPortalCatalogLoading', () => {
    expect(selectPortalCatalogLoading(appState)).toEqual(false);
  });

  it('should handle selectPortalCatalogError', () => {
    expect(selectPortalCatalogError(appState)).toEqual(false);
  });

  it('should handle selectPortalCatalogErrorMsg', () => {
    expect(selectPortalCatalogErrorMsg(appState)).toEqual('error');
  });
});
