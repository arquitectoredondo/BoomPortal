import { CalendarNewSettings } from '../../models/calendar-new-settings.model';
import {
  CalendarNewSettingsActionTypes,
  LOAD_CALENDAR_NEW_SETTINGS,
  LOAD_CALENDAR_NEW_SETTINGS_SUCCESS,
  LOAD_CALENDAR_NEW_SETTINGS_FAILURE,
  SAVE_CALENDAR_NEW_SETTINGS,
  PUBLISH_CALENDAR_NEW_SETTINGS,
} from './calendar-new-settings.types';

export const loadCalendarNewSettings = (): CalendarNewSettingsActionTypes => ({
  type: LOAD_CALENDAR_NEW_SETTINGS,
});

export const loadCalendarNewSettingsSuccess = (
  calendarNewSettings: CalendarNewSettings
): CalendarNewSettingsActionTypes => ({
  type: LOAD_CALENDAR_NEW_SETTINGS_SUCCESS,
  payload: calendarNewSettings,
});

export const loadCalendarNewSettingsFailure = (
  error: string
): CalendarNewSettingsActionTypes => ({
  type: LOAD_CALENDAR_NEW_SETTINGS_FAILURE,
  payload: error,
});

export const saveCalendarNewSettings = (
  settings: CalendarNewSettings
): CalendarNewSettingsActionTypes => ({
  type: SAVE_CALENDAR_NEW_SETTINGS,
  payload: settings,
});

export const publishCalendarNewSettings =
  (): CalendarNewSettingsActionTypes => ({
    type: PUBLISH_CALENDAR_NEW_SETTINGS,
  });
