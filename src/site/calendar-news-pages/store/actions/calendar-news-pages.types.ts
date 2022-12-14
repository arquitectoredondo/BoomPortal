export const LOAD_CALENDAR_NEWS_PAGES: string =
  '[JOURNAL_PAGES] LOAD_CALENDAR_NEWS_PAGES';
export const LOAD_CALENDAR_NEWS_PAGES_SUCCESS: string =
  '[JOURNAL_PAGES] LOAD_CALENDAR_NEWS_PAGES_SUCCESS';
export const LOAD_CALENDAR_NEWS_PAGES_FAILURE: string =
  '[JOURNAL_PAGES] LOAD_CALENDAR_NEWS_PAGES_FAILURE';

export interface LoadCalendarNewsPages {
  type: typeof LOAD_CALENDAR_NEWS_PAGES;
}

export interface LoadCalendarNewsPagesSuccess {
  type: typeof LOAD_CALENDAR_NEWS_PAGES_SUCCESS;
  payload: any;
}

export interface LoadCalendarNewsPagesFailure {
  type: typeof LOAD_CALENDAR_NEWS_PAGES_FAILURE;
  payload: string;
}

export type CalendarNewsPagesActionTypes =
  | LoadCalendarNewsPages
  | LoadCalendarNewsPagesSuccess
  | LoadCalendarNewsPagesFailure;
