import {
  PortalCatalogActionTypes,
  SavePortalCatalog,
  SAVE_PORTAL_CATALOG,
  LOAD_PORTAL_CATALOG_FAILURE,
  LoadPortalCatalogSuccess,
  LOAD_PORTAL_CATALOG_SUCCESS,
  LOAD_PORTAL_CATALOG,
  LoadPortalCatalogFailure,
} from '../actions/portal-catalog.types';
import { CatalogSettings } from '../../../../shared/models/catalog.model';

export interface PortalCatalogState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalCatalog: CatalogSettings | undefined;
}

const initialState: PortalCatalogState = {
  loading: false,
  error: false,
  errorMsg: '',
  portalCatalog: undefined,
};

const portalCatalogReducer = (
  state: PortalCatalogState = initialState,
  action: PortalCatalogActionTypes
) => {
  switch (action.type) {
    case LOAD_PORTAL_CATALOG: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_CATALOG_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        portalCatalog: (action as LoadPortalCatalogSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_CATALOG_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadPortalCatalogFailure).payload,
      };
    }

    case SAVE_PORTAL_CATALOG: {
      return {
        ...state,
        portalCatalog: (action as SavePortalCatalog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default portalCatalogReducer;
