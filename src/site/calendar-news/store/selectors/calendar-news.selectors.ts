import { AppState } from '../../../../core/store/store';
import { CalendarNewState } from '../reducers/calendar-news.reducer';
import { Journal } from '../../../site/models/journal.model';

export const selectCalendarNewsState = (store: AppState): CalendarNewState =>
  store.calendarNews;

export const selectCalendarNews = (store: AppState): Journal[] =>
  selectCalendarNewsState(store)?.calendarNews;

export const selectCalendarNewsPending = (store: AppState): boolean =>
  selectCalendarNewsState(store)?.loading;

export const selectCalendarNewsError = (store: AppState): boolean =>
  selectCalendarNewsState(store)?.error;

export const selectCalendarNewsErrorMsg = (store: AppState): string =>
  selectCalendarNewsState(store)?.errorMsg;

export const selectCalendarNewDialogOpen = (store: AppState): boolean =>
  selectCalendarNewsState(store)?.dialogOpen;
