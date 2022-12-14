import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { CalendarNewsPage } from '../../models/calendar-news-page.model';
import {
  CalendarNewsPagesDetailsActionTypes,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  LoadCalendarNewsPagesDetailsSuccess,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  UpdateCalendarNewsPagesDetailsSuccess,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
} from '../actions/calendar-news-page-details.types';
import { layoutMapper } from '../../../pages/services/page-details.service';
import { LoadCalendarNewsPagesFailure } from '../actions/calendar-news-pages.types';

export interface CalendarNewsPagesDetailsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pageLayout: ResponsiveLayout;
  pageDetails: CalendarNewsPage | undefined;
}

const initialState: CalendarNewsPagesDetailsState = {
  loading: false,
  error: false,
  pageLayout: { lg: [] },
  pageDetails: undefined,
  errorMsg: '',
};

const calendarNewsJournalPagesDetailsReducer = (
  state: CalendarNewsPagesDetailsState = initialState,
  action: CalendarNewsPagesDetailsActionTypes
) => {
  switch (action.type) {
    case UPDATE_CALENDAR_NEWS_PAGES_DETAILS:
    case LOAD_CALENDAR_NEWS_PAGES_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false,
        calendarNewsPageDetails: undefined,
        pageLayout: { lg: [] },
        errorMsg: '',
      };
    }

    case LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS: {
      const { pageWidgets, ...pageDetails } = (
        action as LoadCalendarNewsPagesDetailsSuccess
      ).payload;
      return {
        ...state,
        loading: false,
        error: false,
        pageLayout: {
          lg: layoutMapper(pageWidgets || []),
        },
        pageDetails,
        errorMsg: '',
      };
    }

    case UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        pageDetails: (action as UpdateCalendarNewsPagesDetailsSuccess).payload,
      };
    }

    case UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE:
    case LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE: {
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

export default calendarNewsJournalPagesDetailsReducer;
