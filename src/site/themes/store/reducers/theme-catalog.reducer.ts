import {
  ThemeCatalogActionTypes,
  SAVE_THEME_CATALOG,
  SaveThemeCatalog,
  LOAD_THEME_CATALOG_FAILURE,
  LoadThemeCatalogSuccess,
  LOAD_THEME_CATALOG_SUCCESS,
  LOAD_THEME_CATALOG,
  LoadThemeCatalogFailure,
} from '../actions/theme-catalog.types';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

export interface ThemeCatalogState {
  loading: boolean;
  error: boolean;
  themeCatalog: CatalogSettings | undefined;
  errorMsg: string;
}

const initialState: ThemeCatalogState = {
  loading: false,
  error: false,
  themeCatalog: undefined,
  errorMsg: ''
};

const themeCatalogReducer = (
  state: ThemeCatalogState = initialState,
  action: ThemeCatalogActionTypes
) => {
  switch (action.type) {
    case LOAD_THEME_CATALOG: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case LOAD_THEME_CATALOG_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        themeCatalog: (action as LoadThemeCatalogSuccess).payload,
      };
    }

    case LOAD_THEME_CATALOG_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadThemeCatalogFailure).payload
      };
    }

    case SAVE_THEME_CATALOG: {
      return {
        ...state,
        themeCatalog: (action as SaveThemeCatalog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default themeCatalogReducer;
