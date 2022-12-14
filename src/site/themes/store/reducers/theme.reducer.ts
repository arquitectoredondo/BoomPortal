import { Theme } from '../../models/themes.model';
import {
  ThemeActionTypes,
  LOAD_THEMES,
  LOAD_THEMES_SUCCESS,
  LOAD_THEMES_FAILURE,
  LoadThemesSuccess,
  THEME_SELECTED_ID,
  ThemeSelectedID,
  LoadThemeIsSelected,
  THEME_IS_SELECTED
} from '../actions/theme.types';

export interface ThemeState {
  loading: boolean;
  error: boolean;
  themes: Theme[];
  themeSelectedID: string;
  themeIsSelected: boolean;
}

const initialState: ThemeState = {
  loading: false,
  error: false,
  themes: [],
  themeSelectedID: '',
  themeIsSelected: false
};

const themeReducer = (
  state: ThemeState = initialState,
  action: ThemeActionTypes
) => {
  switch (action.type) {
    case THEME_SELECTED_ID: {
      const payload: string = (action as ThemeSelectedID).payload;
      return {
        ...state,
        loading: false,
        error: false,
        themeSelectedID: payload
      };
    }
    case LOAD_THEMES: {
      return {
        ...state,
        loading: true,
        error: false,
        themes: []
      };
    }

    case THEME_IS_SELECTED: {
      const payload: boolean = (action as LoadThemeIsSelected).payload;
      return {
        ...state,
        themeIsSelected: payload
      };
    }
    case LOAD_THEMES_SUCCESS: {
      const payload: Theme[] = (action as LoadThemesSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        themes: payload
      };
    }
    case LOAD_THEMES_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
        themes: []
      };
    }

    default: {
      return state;
    }
  }
};

export default themeReducer;
