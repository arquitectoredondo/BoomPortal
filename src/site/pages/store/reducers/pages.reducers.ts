import {
  PortalPagesActionTypes,
  LOAD_PORTAL_PAGES,
  LOAD_PORTAL_PAGES_SUCCESS,
  LoadPortalPagesSuccess,
  LOAD_PORTAL_PAGES_FAILURE,
  LoadPortalPagesFailure,
} from '../actions/pages.types';

export interface PortalPagesState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pages: any[];
}

const initialState: PortalPagesState = {
  loading: false,
  error: false,
  pages: [],
  errorMsg: '',
};

const portalPagesReducer = (
  state: PortalPagesState = initialState,
  action: PortalPagesActionTypes
) => {
  switch (action.type) {
    case LOAD_PORTAL_PAGES: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_PAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        pages: (action as LoadPortalPagesSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_PAGES_FAILURE: {
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

export default portalPagesReducer;
