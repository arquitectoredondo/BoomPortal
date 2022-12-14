import reducer from './theme-pages.reducer';

import {
  loadThemePages,
  loadThemePagesSuccess,
  loadThemePagesFailure,
} from '../actions/theme-pages.actions';
import { ThemePageState } from './theme-pages.reducer';

const initialState: ThemePageState = {
  loading: false,
  error: false,
  themePages: [],
};

describe('Theme Pages reducer', () => {
  it('should handle LOAD_THEME_PAGES', () => {
    expect(reducer(initialState, loadThemePages())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      themePages: [],
    });
  });

  it('should handle LOAD_THEME_PAGES_SUCCESS', () => {
    let pages: any[] = [];

    expect(reducer(initialState, loadThemePagesSuccess(pages))).toEqual({
      ...initialState,
      loading: false,
      error: false,
      themePages: [],
    });
  });

  it('should handle LOAD_THEME_PAGES_FAILURE', () => {
    expect(reducer(initialState, loadThemePagesFailure())).toEqual({
      ...initialState,
      loading: false,
      error: true,
      themePages: [],
    });
  });
});
