import { CalendarNewSettings } from '../../models/calendar-new-settings.model';

export const LOAD_CALENDAR_NEW_SETTINGS: string =
  '[SETTINGS] LOAD_CALENDAR_NEW_SETTINGS';
export const LOAD_CALENDAR_NEW_SETTINGS_SUCCESS: string =
  '[SETTINGS] LOAD_CALENDAR_NEW_SETTINGS_SUCCESS';
export const LOAD_CALENDAR_NEW_SETTINGS_FAILURE: string =
  '[SETTINGS] LOAD_CALENDAR_NEW_SETTINGS_FAILURE';

export const PUBLISH_CALENDAR_NEW_SETTINGS: string =
  '[SETTINGS] PUBLISH_CALENDAR_NEW_SETTINGS';

export const SAVE_CALENDAR_NEW_SETTINGS: string =
  '[SETTINGS] SAVE_CALENDAR_NEW_SETTINGS';

export interface LoadCalendarNewSettings {
  type: typeof LOAD_CALENDAR_NEW_SETTINGS;
}

export interface LoadCalendarNewSettingsSuccess {
  type: typeof LOAD_CALENDAR_NEW_SETTINGS_SUCCESS;
  payload: CalendarNewSettings;
}

export interface LoadCalendarNewSettingsFailure {
  type: typeof LOAD_CALENDAR_NEW_SETTINGS_FAILURE;
  payload: string;
}

export interface PublishCalendarNewSettings {
  type: typeof PUBLISH_CALENDAR_NEW_SETTINGS;
}

export interface SaveCalendarNewSettings {
  type: typeof SAVE_CALENDAR_NEW_SETTINGS;
  payload: CalendarNewSettings;
}

export type CalendarNewSettingsActionTypes =
  | LoadCalendarNewSettings
  | LoadCalendarNewSettingsSuccess
  | LoadCalendarNewSettingsFailure
  | SaveCalendarNewSettings
  | PublishCalendarNewSettings;
