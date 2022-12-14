import { AppState } from '../../../../core/store/store';
import { CalendarNewsPagesDetailsState } from '../reducers/calendar-news-page-details.reducers';
import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { CalendarNewsPage } from '../../models/calendar-news-page.model';

export const selectCalendarNewsPageDetailsState = (
  store: AppState
): CalendarNewsPagesDetailsState => store.calendarNewsPageDetails;

export const selectCalendarNewsPageDetailsLayout = (
  store: AppState
): ResponsiveLayout => selectCalendarNewsPageDetailsState(store)?.pageLayout;

export const selectCalendarNewsPageDetails = (
  store: AppState
): CalendarNewsPage | undefined =>
  selectCalendarNewsPageDetailsState(store)?.pageDetails;

export const selectCalendarNewsPageDetailsLoading = (
  store: AppState
): boolean => selectCalendarNewsPageDetailsState(store)?.loading;

export const selectCalendarNewsPageDetailsError = (store: AppState): boolean =>
  selectCalendarNewsPageDetailsState(store)?.error;

export const selectCalendarNewsPageDetailsErrorMsg = (
  store: AppState
): string => selectCalendarNewsPageDetailsState(store)?.errorMsg;
