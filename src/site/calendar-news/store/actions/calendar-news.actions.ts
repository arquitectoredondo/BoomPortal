import {
  CalendarNewActionTypes,
  OPEN_CLOSE_CREATE_DIALOG,
  LOAD_CALENDAR_NEWS_FAILURE,
  LOAD_CALENDAR_NEWS_SUCCESS,
  LOAD_CALENDAR_NEWS,
} from './calendar-news.type';
import { Journal } from '../../../site/models/journal.model';

export const loadCalendarNews = (): CalendarNewActionTypes => ({
  type: LOAD_CALENDAR_NEWS,
});

export const loadCalendarNewsSuccess = (
  calendarNews: Journal[]
): CalendarNewActionTypes => ({
  type: LOAD_CALENDAR_NEWS_SUCCESS,
  payload: calendarNews,
});

export const loadCalendarNewsFailure = (
  error: string
): CalendarNewActionTypes => ({
  type: LOAD_CALENDAR_NEWS_FAILURE,
  payload: error,
});

export const openCloseCreationDialog = (
  value: boolean
): CalendarNewActionTypes => ({
  type: OPEN_CLOSE_CREATE_DIALOG,
  payload: value,
});
