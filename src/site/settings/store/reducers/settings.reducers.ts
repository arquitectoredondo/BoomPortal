import {
  PortalSettingsActionTypes,
  LOAD_PORTAL_SETTINGS,
  LOAD_PORTAL_SETTINGS_SUCCESS,
  LOAD_PORTAL_SETTINGS_FAILURE,
  SAVE_PORTAL_SETTINGS,
  PUBLISH_PORTAL_SETTINGS,
  LoadPortalSettingsSuccess,
  SavePortalSettings,
  LoadPortalSettingsFailure,
} from '../actions/settings.types';
import { PortalSettings } from '../../models/portal-settings.model';

export interface PortalSettingsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalSettings: PortalSettings | undefined;
}

const initialState: PortalSettingsState = {
  loading: false,
  error: false,
  errorMsg: '',
  portalSettings: undefined,
};

const portalSettingsReducer = (
  state: PortalSettingsState = initialState,
  action: PortalSettingsActionTypes
) => {
  switch (action.type) {
    case LOAD_PORTAL_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_SETTINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        portalSettings: (action as LoadPortalSettingsSuccess).payload,
      };
    }

    case LOAD_PORTAL_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadPortalSettingsFailure).payload,
      };
    }

    case SAVE_PORTAL_SETTINGS: {
      return {
        ...state,
        portalSettings: (action as SavePortalSettings).payload,
      };
    }

    case PUBLISH_PORTAL_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default portalSettingsReducer;
