import reducer, {
  CalendarNewsPagesState,
} from './calendar-news-pages.reducers';
import {
  loadCalendarNewsPages,
  loadCalendarNewsPagesSuccess,
  loadCalendarNewsPagesFailure,
} from '../actions/calendar-news-pages.actions';

const initialState: CalendarNewsPagesState = {
  loading: false,
  error: false,
  errorMsg: '',
  pages: [],
};

describe('journal pages reducer', () => {
  it('should handle LOAD_CALENDAR_NEWS_PAGES', () => {
    expect(reducer(initialState, loadCalendarNewsPages())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_CALENDAR_NEWS_PAGES_SUCCESS', () => {
    expect(reducer(initialState, loadCalendarNewsPagesSuccess([]))).toEqual({
      ...initialState,
      pages: [],
    });
  });

  it('should handle LOAD_CALENDAR_NEWS_PAGES_FAILURE', () => {
    expect(reducer(initialState, loadCalendarNewsPagesFailure('e'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });
});
