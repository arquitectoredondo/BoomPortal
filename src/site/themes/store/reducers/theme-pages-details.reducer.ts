import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { Page } from '../../../pages/models/page.model';
import {
  ThemePagesDetailsActionTypes,
  UPDATE_THEME_PAGES_DETAILS,
  LOAD_THEME_PAGES_DETAILS,
  LOAD_THEME_PAGES_DETAILS_SUCCESS,
  UPDATE_THEME_PAGES_DETAILS_SUCCESS,
  UPDATE_THEME_PAGES_DETAILS_FAILURE,
  LOAD_THEME_PAGES_DETAILS_FAILURE,
} from '../actions/theme-pages-details.types';

import { layoutMapper } from '../../../pages/services/page-details.service';
import { LoadPortalPagesDetailsSuccess } from '../../../pages/store/actions/page-details.types';

export interface ThemePagesDetailsState {
  loading: boolean;
  error: boolean;
  pageLayout: ResponsiveLayout;
  pageDetails: Page | undefined;
}

const initialState: ThemePagesDetailsState = {
  loading: false,
  error: false,
  pageLayout: { lg: [] },
  pageDetails: undefined,
};

const themePagesDetailsReducer = (
  state: ThemePagesDetailsState = initialState,
  action: ThemePagesDetailsActionTypes
) => {
  switch (action.type) {
    case UPDATE_THEME_PAGES_DETAILS:
    case LOAD_THEME_PAGES_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false,
        pageDetails: undefined,
        pageLayout: { lg: [] },
      };
    }

    case LOAD_THEME_PAGES_DETAILS_SUCCESS: {
      const {
        pageWidgets,
        ...pageDetails
      } = (action as LoadPortalPagesDetailsSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        pageLayout: {
          lg: layoutMapper(pageWidgets || []),
        },
        pageDetails,
      };
    }

    case UPDATE_THEME_PAGES_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case UPDATE_THEME_PAGES_DETAILS_FAILURE:
    case LOAD_THEME_PAGES_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default themePagesDetailsReducer;
