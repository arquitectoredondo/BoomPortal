import { AppState } from '../../../../core/store/store';
import { CalendarNewsPagesState } from '../reducers/calendar-news-pages.reducers';

export const selectCalendarNewsPagesState = (
  store: AppState
): CalendarNewsPagesState => store.calendarNewsPages;

export const selectCalendarNewsPages = (store: AppState): any[] =>
  selectCalendarNewsPagesState(store).pages;

export const selectCalendarNewsPagesLoading = (store: AppState): boolean =>
  selectCalendarNewsPagesState(store).loading;

export const selectCalendarNewsPagesError = (store: AppState): boolean =>
  selectCalendarNewsPagesState(store).error;

export const selectCalendarNewsPagesErrorMsg = (store: AppState): string =>
  selectCalendarNewsPagesState(store).errorMsg;
