import { AppState } from '../../../../core/store/store';
import { CalendarNewSettingsState } from '../reducers/calendar-new-settings.reducer';
import { CalendarNewSettings } from '../../models/calendar-new-settings.model';

export const selectCalendarNewSettingsState = (
  store: AppState
): CalendarNewSettingsState => store.calendarNewSettings;

export const selectCalendarNewSettings = (
  store: AppState
): CalendarNewSettings | undefined =>
  selectCalendarNewSettingsState(store).calendarNewSettings;

export const selectCalendarNewSettingsLoading = (store: AppState): boolean =>
  selectCalendarNewSettingsState(store).loading;

export const selectCalendarNewSettingsError = (store: AppState): boolean =>
  selectCalendarNewSettingsState(store).error;

export const selectCalendarNewSettingsErrorMsg = (store: AppState): string =>
  selectCalendarNewSettingsState(store).errorMsg;
