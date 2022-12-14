import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import {
  LOAD_PORTAL_PAGES_DETAILS,
  LOAD_PORTAL_PAGES_DETAILS_SUCCESS,
  LOAD_PORTAL_PAGES_DETAILS_FAILURE,
  PortalPagesDetailsActionTypes,
  LoadPortalPagesDetailsSuccess,
  UPDATE_PORTAL_PAGES_DETAILS,
  UPDATE_PORTAL_PAGES_DETAILS_SUCCESS,
  UPDATE_PORTAL_PAGES_DETAILS_FAILURE,
  UpdatePortalPagesDetailsSuccess,
} from '../actions/page-details.types';
import { layoutMapper } from '../../services/page-details.service';
import { Page } from '../../models/page.model';
import { LoadPortalPagesFailure } from '../actions/pages.types';

export interface PortalPagesDetailsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pageLayout: ResponsiveLayout;
  pageDetails: Page | undefined;
}

const initialState: PortalPagesDetailsState = {
  loading: false,
  error: false,
  pageLayout: { lg: [] },
  pageDetails: undefined,
  errorMsg: '',
};

const portalPagesDetailsReducer = (
  state: PortalPagesDetailsState = initialState,
  action: PortalPagesDetailsActionTypes
) => {
  switch (action.type) {
    case UPDATE_PORTAL_PAGES_DETAILS:
    case LOAD_PORTAL_PAGES_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false,
        pageDetails: undefined,
        pageLayout: { lg: [] },
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_PAGES_DETAILS_SUCCESS: {
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
        errorMsg: '',
      };
    }

    case UPDATE_PORTAL_PAGES_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        pageDetails: (action as UpdatePortalPagesDetailsSuccess).payload,
      };
    }

    case UPDATE_PORTAL_PAGES_DETAILS_FAILURE:
    case LOAD_PORTAL_PAGES_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadPortalPagesFailure).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default portalPagesDetailsReducer;
