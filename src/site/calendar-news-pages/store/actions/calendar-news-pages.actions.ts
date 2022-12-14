import {
  CalendarNewsPagesActionTypes,
  LOAD_CALENDAR_NEWS_PAGES,
  LOAD_CALENDAR_NEWS_PAGES_SUCCESS,
  LOAD_CALENDAR_NEWS_PAGES_FAILURE,
} from './calendar-news-pages.types';

export const loadCalendarNewsPages = (): CalendarNewsPagesActionTypes => ({
  type: LOAD_CALENDAR_NEWS_PAGES,
});

export const loadCalendarNewsPagesSuccess = (
  pages: any
): CalendarNewsPagesActionTypes => ({
  type: LOAD_CALENDAR_NEWS_PAGES_SUCCESS,
  payload: pages,
});

export const loadCalendarNewsPagesFailure = (
  error: string
): CalendarNewsPagesActionTypes => ({
  type: LOAD_CALENDAR_NEWS_PAGES_FAILURE,
  payload: error,
});
