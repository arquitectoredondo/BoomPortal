import { Journal } from '../../../site/models/journal.model';
import {
  CalendarNewActionTypes,
  LOAD_CALENDAR_NEWS,
  LOAD_CALENDAR_NEWS_FAILURE,
  LOAD_CALENDAR_NEWS_SUCCESS,
  OPEN_CLOSE_CREATE_DIALOG,
  OpenCloseCreateDialog,
  LoadCalendarNewsSuccess,
  LoadCalendarNewsFailure,
} from '../actions/calendar-news.type';

export interface CalendarNewState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
  calendarNews: Journal[];
}

const initialState: CalendarNewState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: '',
  calendarNews: [],
};

const calendarNewReducer = (
  state: CalendarNewState = initialState,
  action: CalendarNewActionTypes
) => {
  switch (action.type) {
    case LOAD_CALENDAR_NEWS: {
      return {
        ...state,
        loading: true,
        error: false,
        calendarNews: [],
        errorMsg: '',
      };
    }
    case LOAD_CALENDAR_NEWS_SUCCESS: {
      const payload: Journal[] = (action as LoadCalendarNewsSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        calendarNews: payload,
        errorMsg: '',
      };
    }
    case LOAD_CALENDAR_NEWS_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
        calendarNews: [],
        errorMsg: (action as LoadCalendarNewsFailure).payload,
      };
    }

    case OPEN_CLOSE_CREATE_DIALOG: {
      return {
        ...state,
        dialogOpen: (action as OpenCloseCreateDialog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default calendarNewReducer;
