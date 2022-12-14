import { CalendarNewsPageDetails } from '../../models/calendar-news-page.model';

export const LOAD_CALENDAR_NEWS_PAGES_DETAILS: string =
  '[JOURNAL PAGES] LOAD_CALENDAR_NEWS_PAGES_DETAILS';
export const LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS: string =
  '[JOURNAL PAGES] LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS';
export const LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE: string =
  '[JOURNAL PAGES] LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE';

export const UPDATE_CALENDAR_NEWS_PAGES_DETAILS: string =
  '[JOURNAL PAGES] UPDATE_CALENDAR_NEWS_PAGES_DETAILS';
export const UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS: string =
  '[JOURNAL PAGES] UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS';
export const UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE: string =
  '[JOURNAL PAGES] UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE';

export interface LoadCalendarNewsPagesDetails {
  type: typeof LOAD_CALENDAR_NEWS_PAGES_DETAILS;
}

export interface LoadCalendarNewsPagesDetailsSuccess {
  type: typeof LOAD_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS;
  payload: CalendarNewsPageDetails;
}

export interface LoadCalendarNewsPagesDetailsFailure {
  type: typeof LOAD_CALENDAR_NEWS_PAGES_DETAILS_FAILURE;
  payload: string;
}

export interface UpdateCalendarNewsPagesDetails {
  type: typeof UPDATE_CALENDAR_NEWS_PAGES_DETAILS;
}

export interface UpdateCalendarNewsPagesDetailsSuccess {
  type: typeof UPDATE_CALENDAR_NEWS_PAGES_DETAILS_SUCCESS;
  payload: CalendarNewsPageDetails;
}

export interface UpdateCalendarNewsPagesDetailsFailure {
  type: typeof UPDATE_CALENDAR_NEWS_PAGES_DETAILS_FAILURE;
  payload: string;
}

export type CalendarNewsPagesDetailsActionTypes =
  | LoadCalendarNewsPagesDetails
  | LoadCalendarNewsPagesDetailsSuccess
  | LoadCalendarNewsPagesDetailsFailure
  | UpdateCalendarNewsPagesDetails
  | UpdateCalendarNewsPagesDetailsSuccess
  | UpdateCalendarNewsPagesDetailsFailure;
