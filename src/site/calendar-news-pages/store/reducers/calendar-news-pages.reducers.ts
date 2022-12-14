import {
  CalendarNewsPagesActionTypes,
  LOAD_CALENDAR_NEWS_PAGES,
  LOAD_CALENDAR_NEWS_PAGES_SUCCESS,
  LoadCalendarNewsPagesSuccess,
  LOAD_CALENDAR_NEWS_PAGES_FAILURE,
  LoadCalendarNewsPagesFailure,
} from '../actions/calendar-news-pages.types';

export interface CalendarNewsPagesState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pages: any[];
}

const initialState: CalendarNewsPagesState = {
  loading: false,
  error: false,
  pages: [],
  errorMsg: '',
};

const calendarNewsJournalPagesReducer = (
  state: CalendarNewsPagesState = initialState,
  action: CalendarNewsPagesActionTypes
) => {
  switch (action.type) {
    case LOAD_CALENDAR_NEWS_PAGES: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_CALENDAR_NEWS_PAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        pages: (action as LoadCalendarNewsPagesSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_CALENDAR_NEWS_PAGES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadCalendarNewsPagesFailure).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default calendarNewsJournalPagesReducer;
