import reducer, { ThemePagesDetailsState } from './theme-pages-details.reducer';
import {
  loadThemePageDetails,
  updateThemePageDetails,
  loadThemePageDetailsSuccess,
  updateThemePageDetailsSuccess,
  loadThemePageDetailsFailure,
  updateThemePageDetailsFailure,
} from '../actions/theme-pages-details.actions';

const initialState: ThemePagesDetailsState = {
  loading: false,
  error: false,
  pageDetails: undefined,
  pageLayout: { lg: [] },
};

describe('theme pages reducer', () => {
  it('should handle LOAD_THEME_PAGES_DETAILS', () => {
    expect(reducer(initialState, loadThemePageDetails())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle UPDATE_THEME_PAGES_DETAILS', () => {
    expect(reducer(initialState, updateThemePageDetails())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_THEME_PAGES_DETAILS_SUCCESS', () => {
    expect(
      reducer(
        initialState,
        loadThemePageDetailsSuccess({
          id: '127876271d5e4ae68a8a6f0e3a3d64da',
          label: 'Page1(serviceMock)',
          createdBy: 'admin',
          creationDate: '2020-04-23T10:06:06.939+0000',
          link: 'pageLink',
          canRevert: true,
          visibility: true,
          parentUuid: '1',
          pageWidgets: [
            {
              uuid: 'id',
              label: 'label',
              internal: false,
              title: 'title',
              x: 0,
              y: 0,
              h: 3,
              w: 3,
              minH: 3,
              minW: 3,
              description: 'text',
              backgroundColor: 'red',
              fontColor: 'black',
              widgetType: 6,
              borderTop: false,
              borderRight: true,
              borderBottom: true,
              borderLeft: true,
              image: 'image',
              url: 'url',
              name: 'name',
              id: 'id',
              type: 1,
              static: false,
              i: '0',
            },
          ],
        })
      )
    ).toEqual({
      ...initialState,
      pageDetails: {
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        link: 'pageLink',
        canRevert: true,
        visibility: true,
        parentUuid: '1',
      },
      pageLayout: {
        lg: [
          {
            uuid: 'id',
            label: 'label',
            internal: false,
            title: 'title',
            x: 0,
            y: 0,
            h: 3,
            w: 3,
            minH: 3,
            minW: 3,
            description: 'text',
            backgroundColor: 'red',
            fontColor: 'black',
            widgetType: 6,
            borderTop: false,
            borderRight: true,
            borderBottom: true,
            borderLeft: true,
            image: 'image',
            url: 'url',
            name: 'name',
            id: 'id',
            type: 1,
            static: false,
            i: '0',
          },
        ],
      },
    });
  });

  it('should handle UPDATE_THEME_PAGES_DETAILS_SUCCESS', () => {
    expect(reducer(initialState, updateThemePageDetailsSuccess())).toEqual({
      ...initialState,
      loading: false,
      error: false,
    });
  });

  it('should handle LOAD_THEME_PAGES_DETAILS_FAILURE', () => {
    expect(reducer(initialState, loadThemePageDetailsFailure())).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should handle UPDATE_THEME_PAGES_DETAILS_FAILURE', () => {
    expect(reducer(initialState, updateThemePageDetailsFailure())).toEqual({
      ...initialState,
      error: true,
    });
  });
});
