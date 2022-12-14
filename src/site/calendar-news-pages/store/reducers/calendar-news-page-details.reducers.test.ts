import reducer, {
  CalendarNewsPagesDetailsState,
} from './calendar-news-page-details.reducers';
import {
  loadCalendarNewsPageDetails,
  updateCalendarNewsPageDetails,
  loadCalendarNewsPageDetailsSuccess,
  updateCalendarNewsPageDetailsSuccess,
  loadCalendarNewsPageDetailsFailure,
  updateCalendarNewsPageDetailsFailure,
} from '../actions/calendar-news-page-details.actions';

const initialState: CalendarNewsPagesDetailsState = {
  loading: false,
  error: false,
  pageDetails: undefined,
  pageLayout: { lg: [] },
  errorMsg: '',
};

describe('pages reducer', () => {
  it('should handle LOAD_CALENDAR_NEWS_PAGES_DETAILS', () => {
    expect(reducer(initialState, loadCalendarNewsPageDetails())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle UPDATE_CALENDAR_NEWS_PAGES_DETAILS', () => {
    expect(reducer(initialState, updateCalendarNewsPageDetails())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS', () => {
    expect(
      reducer(
        initialState,
        loadCalendarNewsPageDetailsSuccess({
          id: '127876271d5e4ae68a8a6f0e3a3d64da',
          label: 'JournalPage1(serviceMock)',
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
        label: 'JournalPage1(serviceMock)',
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

  it('should handle UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS', () => {
    expect(
      reducer(initialState, updateCalendarNewsPageDetailsSuccess())
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
    });
  });

  it('should handle LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE', () => {
    expect(
      reducer(initialState, loadCalendarNewsPageDetailsFailure('e'))
    ).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE', () => {
    expect(
      reducer(initialState, updateCalendarNewsPageDetailsFailure('e'))
    ).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });
});
