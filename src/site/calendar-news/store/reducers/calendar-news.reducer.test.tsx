import reducer, { CalendarNewState } from './calendar-news.reducer';
import {
  loadCalendarNews,
  openCloseCreationDialog,
  loadCalendarNewsSuccess,
  loadCalendarNewsFailure,
} from '../actions/calendar-news.actions';

const initialState: CalendarNewState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: '',
  calendarNews: [],
};

describe('portals reducer', () => {
  it('should handle LOAD_PORTALS', () => {
    expect(reducer(initialState, loadCalendarNews())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_PORTALS_SUCCESS', () => {
    expect(reducer(initialState, loadCalendarNewsSuccess([]))).toEqual({
      ...initialState,
      calendarNews: [],
    });
  });

  it('should handle LOAD_PORTALS_FAILURE', () => {
    expect(reducer(initialState, loadCalendarNewsFailure('error'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle OPEN_CLOSE_CREATE_DIALOG', () => {
    expect(reducer(initialState, openCloseCreationDialog(true))).toEqual({
      ...initialState,
      dialogOpen: true,
    });
  });
});
