import { Portal } from '../../../site/models/portal.model';
import {
  PortalActionTypes,
  LOAD_PORTALS,
  LOAD_PORTALS_SUCCESS,
  LoadPortalsSuccess,
  LOAD_PORTALS_FAILURE,
  OPEN_CLOSE_CREATE_DIALOG,
  OpenCloseCreateDialog,
  LoadPortalsFailure,
} from '../actions/portals.type';

export interface PortalState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
  portals: Portal[];
}

const initialState: PortalState = {
  loading: false,
  error: false,
  dialogOpen: false,
  portals: [],
  errorMsg: '',
};

const portalReducer = (
  state: PortalState = initialState,
  action: PortalActionTypes
) => {
  switch (action.type) {
    case LOAD_PORTALS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
        portals: [],
      };
    }
    case LOAD_PORTALS_SUCCESS: {
      const payload: Portal[] = (action as LoadPortalsSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        portals: payload,
      };
    }
    case LOAD_PORTALS_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
        portals: [],
        errorMsg: (action as LoadPortalsFailure).payload,
      };
    }

    case OPEN_CLOSE_CREATE_DIALOG: {
      return {
        ...state,
        dialogOpen: (action as OpenCloseCreateDialog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default portalReducer;
