import {
  CalendarNewsPagesDetailsActionTypes,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
} from './calendar-news-page-details.types';
import { CalendarNewsPageDetails } from '../../models/calendar-news-page.model';

export const loadCalendarNewsPageDetails =
  (): CalendarNewsPagesDetailsActionTypes => ({
    type: LOAD_CALENDAR_NEWS_PAGES_DETAILS,
  });

export const loadCalendarNewsPageDetailsSuccess = (
  pageDetails: CalendarNewsPageDetails
): CalendarNewsPagesDetailsActionTypes => ({
  type: LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  payload: pageDetails,
});

export const loadCalendarNewsPageDetailsFailure = (
  error: string
): CalendarNewsPagesDetailsActionTypes => ({
  type: LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
  payload: error,
});

export const updateCalendarNewsPageDetails =
  (): CalendarNewsPagesDetailsActionTypes => ({
    type: UPDATE_CALENDAR_NEWS_PAGES_DETAILS,
  });

export const updateCalendarNewsPageDetailsSuccess = (
  newData: CalendarNewsPageDetails
): CalendarNewsPagesDetailsActionTypes => ({
  type: UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS,
  payload: newData,
});

export const updateCalendarNewsPageDetailsFailure = (
  error: string
): CalendarNewsPagesDetailsActionTypes => ({
  type: UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE,
  payload: error,
});
