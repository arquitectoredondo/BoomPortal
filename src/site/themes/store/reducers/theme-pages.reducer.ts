import {
  ThemePagesActionTypes,
  LOAD_THEME_PAGES,
  LOAD_THEME_PAGES_SUCCESS,
  LoadThemePagesSuccess,
  LOAD_THEME_PAGES_FAILURE,
} from '../actions/theme-pages.types';

export interface ThemePageState {
  loading: boolean;
  error: boolean;
  themePages: any[];
}

const initialState: ThemePageState = {
  loading: false,
  error: false,
  themePages: [],
};

const themeCatalogReducer = (
  state: ThemePageState = initialState,
  action: ThemePagesActionTypes
) => {
  switch (action.type) {
    case LOAD_THEME_PAGES: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case LOAD_THEME_PAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        themePages: (action as LoadThemePagesSuccess).payload,
      };
    }

    case LOAD_THEME_PAGES_FAILURE: {
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

export default themeCatalogReducer;
