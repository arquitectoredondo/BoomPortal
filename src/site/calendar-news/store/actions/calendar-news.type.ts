import { Journal } from '../../../site/models/journal.model';
export const LOAD_CALENDAR_NEWS: string =
  '[ADMIN CALENDAR NEW] LOAD_CALENDAR_NEWS';
export const LOAD_CALENDAR_NEWS_SUCCESS: string =
  '[ADMIN CALENDAR NEW] LOAD_CALENDAR_NEWS_SUCCESS';
export const LOAD_CALENDAR_NEWS_FAILURE: string =
  '[ADMIN CALENDAR NEW] LOAD_CALENDAR_NEWS_FAILURE';
export const OPEN_CLOSE_CREATE_DIALOG: string =
  '[ADMIN CALENDAR NEW] OPEN_CLOSE_CREATE_DIALOG';

export interface LoadCalendarNewsSuccess {
  type: typeof LOAD_CALENDAR_NEWS_SUCCESS;
  payload: Journal[];
}

export interface LoadCalendarNewsFailure {
  type: typeof LOAD_CALENDAR_NEWS_FAILURE;
  payload: string;
}

export interface LoadCalendarNews {
  type: typeof LOAD_CALENDAR_NEWS;
}

export interface OpenCloseCreateDialog {
  type: typeof OPEN_CLOSE_CREATE_DIALOG;
  payload: boolean;
}

export type CalendarNewActionTypes =
  | LoadCalendarNewsSuccess
  | LoadCalendarNewsFailure
  | LoadCalendarNews
  | OpenCloseCreateDialog;
