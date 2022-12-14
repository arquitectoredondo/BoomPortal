import reducer from './portal-catalog.reducer';
import { PortalCatalogState } from './portal-catalog.reducer';
import {
  savePortalCatalog,
  loadPortalCatalogFailure,
  loadPortalCatalogSuccess,
  loadPortalCatalog,
} from '../actions/portal-catalog.actions';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

const initialState: PortalCatalogState = {
  loading: false,
  error: false,
  errorMsg: '',
  portalCatalog: undefined,
};

const portalCatalogMock: CatalogSettings = {
  uuid: '1',
  assignedTaxonomies: [],
  publications: [],
  openAccess: true,
  authorizingEbooks: true,
  authorizingJournals: true,
  authorizingJournalArticles: false,
  authorizingDatabases: false,
  authorizingDatabaseArticles: true,
  years: [],
  taxonomyTree: [],
};

describe('Portal catalog reducer', () => {
  it('should handle LOAD_PORTAL_CATALOG', () => {
    expect(reducer(initialState, loadPortalCatalog())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      portalCatalog: undefined,
    });
  });

  it('should handle LOAD_PORTAL_CATALOG_SUCCESS', () => {
    expect(
      reducer(initialState, loadPortalCatalogSuccess(portalCatalogMock))
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      portalCatalog: portalCatalogMock,
    });
  });

  it('should handle LOAD_PORTAL_CATALOG_FAILURE', () => {
    expect(reducer(initialState, loadPortalCatalogFailure('error'))).toEqual({
      ...initialState,
      loading: false,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle SAVE_PORTAL_CATALOG', () => {
    expect(reducer(initialState, savePortalCatalog(portalCatalogMock))).toEqual(
      {
        ...initialState,
        portalCatalog: portalCatalogMock,
      }
    );
  });
});
