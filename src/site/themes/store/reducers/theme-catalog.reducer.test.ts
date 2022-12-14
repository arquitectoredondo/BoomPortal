import reducer, { ThemeCatalogState } from './theme-catalog.reducer';
import {
  loadThemeCatalog,
  loadThemeCatalogSuccess,
  saveThemeCatalog,
  loadThemeCatalogFailure,
} from '../actions/theme-catalog.actions';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

const initialState: ThemeCatalogState = {
  loading: false,
  error: false,
  themeCatalog: undefined,
};

const themeCatalogMock: CatalogSettings = {
  uuid: '1',
  taxonomyTree: [],
  assignedTaxonomies: [],
  publications: [],
  openAccess: true,
  authorizingEbooks: true,
  authorizingJournals: true,
  authorizingJournalArticles: false,
  authorizingDatabases: false,
  authorizingDatabaseArticles: true,
  years: [],
};

describe('Theme catalog reducer', () => {
  it('should handle LOAD_THEME_CATALOG', () => {
    expect(reducer(initialState, loadThemeCatalog())).toEqual({
      loading: true,
      error: false,
      themeCatalog: undefined,
    });
  });

  it('should handle LOAD_THEME_CATALOG_SUCCESS', () => {
    expect(
      reducer(initialState, loadThemeCatalogSuccess(themeCatalogMock))
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      themeCatalog: themeCatalogMock,
    });
  });

  it('should handle LOAD_THEME_CATALOG_FAILURE', () => {
    expect(reducer(initialState, loadThemeCatalogFailure())).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });

  it('should handle SAVE_THEME_CATALOG', () => {
    expect(reducer(initialState, saveThemeCatalog(themeCatalogMock))).toEqual({
      ...initialState,
      themeCatalog: themeCatalogMock,
    });
  });
});
