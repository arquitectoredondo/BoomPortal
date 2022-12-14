import reducer from './theme.reducer';

import { ThemeState } from './theme.reducer';
import {
  loadThemes,
  loadThemesSuccess,
  loadThemesFailure,
  loadThemeSelectedID,
  themeIsSelected
} from '../actions/theme.actions';
import { Theme } from '../../models/themes.model';

const initialState: ThemeState = {
  loading: false,
  error: false,
  themes: [],
  themeSelectedID: '',
  themeIsSelected: false
};

describe('Theme reducer', () => {
  it('should handle LOAD_THEMES', () => {
    expect(reducer(initialState, loadThemes())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      themes: []
    });
  });

  it('should handle LOAD_THEMES_SUCCESS', () => {
    let themes: Theme[] = [
      {
        uuid: '1',
        name: 'Theme1',
        createdBy: 'Sander',
        status: 'Gepubliceerd',
        creationDate: undefined,
      },
      {
        uuid: '2',
        name: 'Theme 2',
        createdBy: 'Sander',
        status: 'Gepubliceerd',
        creationDate: undefined,
      },
    ];

    expect(reducer(initialState, loadThemesSuccess(themes))).toEqual({
      ...initialState,
      loading: false,
      error: false,
      themes: [
        {
          uuid: '1',
          name: 'Theme1',
          createdBy: 'Sander',
          status: 'Gepubliceerd',
          creationDate: undefined,
        },
        {
          uuid: '2',
          name: 'Theme 2',
          createdBy: 'Sander',
          status: 'Gepubliceerd',
          creationDate: undefined,
        },
      ],
    });
  });

  it('should handle LOAD_THEMES_FAILURE', () => {
    expect(reducer(initialState, loadThemesFailure())).toEqual({
      ...initialState,
      loading: false,
      error: true,
      themes: []
    });
  });

  it('should handle THEME_SELECTED_ID', () => {
    let id: string = '1';
    expect(reducer(initialState, loadThemeSelectedID(id))).toEqual({
      ...initialState,
      loading: false,
      error: false,
      themeSelectedID: '1'
    });
  });

  it('should handle THEME_IS_SELECTED', () => {
    expect(reducer(initialState, themeIsSelected(true))).toEqual({
      ...initialState,
      themeIsSelected: true
    });
  });
});
