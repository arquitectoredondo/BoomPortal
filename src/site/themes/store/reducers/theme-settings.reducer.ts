import { ThemeSettings } from '../../models/themes.model';
import {
  ThemeSettingsActionTypes,
  LOAD_THEME_SETTINGS,
  RESET_THEME_SETTINGS,
  LOAD_THEME_SETTINGS_SUCCESS,
  LoadThemeSettingsSuccess,
  SaveThemeSettings,
  LOAD_THEME_SETTINGS_FAILURE,
  SAVE_THEME_SETTINGS,
  LoadThemeSettingsFailure,
} from '../actions/theme-settings.types';

export interface ThemeSettingsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  themeSettings: ThemeSettings | undefined;
}

const initialState: ThemeSettingsState = {
  loading: false,
  error: false,
  errorMsg: '',
  themeSettings: undefined,
};

const themeSettingsReducer = (
  state: ThemeSettingsState = initialState,
  action: ThemeSettingsActionTypes
) => {
  switch (action.type) {
    case LOAD_THEME_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case RESET_THEME_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
        themeSettings: undefined,
      };
    }

    case LOAD_THEME_SETTINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        themeSettings: (action as LoadThemeSettingsSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_THEME_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadThemeSettingsFailure).payload,
      };
    }

    case SAVE_THEME_SETTINGS: {
      return {
        ...state,
        themeSettings: (action as SaveThemeSettings).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default themeSettingsReducer;
