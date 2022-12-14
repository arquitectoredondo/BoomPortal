import { CalendarNewSettings } from '../../models/calendar-new-settings.model';
import {
  CalendarNewSettingsActionTypes,
  PUBLISH_CALENDAR_NEW_SETTINGS,
  SaveCalendarNewSettings,
  SAVE_CALENDAR_NEW_SETTINGS,
  LOAD_CALENDAR_NEW_SETTINGS_FAILURE,
  LoadCalendarNewSettingsSuccess,
  LOAD_CALENDAR_NEW_SETTINGS_SUCCESS,
  LOAD_CALENDAR_NEW_SETTINGS,
  LoadCalendarNewSettingsFailure,
} from '../actions/calendar-new-settings.types';

export interface CalendarNewSettingsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  calendarNewSettings: CalendarNewSettings | undefined;
}

const initialState: CalendarNewSettingsState = {
  loading: false,
  error: false,
  errorMsg: '',
  calendarNewSettings: undefined,
};

const calendarNewSettingsReducer = (
  state: CalendarNewSettingsState = initialState,
  action: CalendarNewSettingsActionTypes
) => {
  switch (action.type) {
    case LOAD_CALENDAR_NEW_SETTINGS:
    case PUBLISH_CALENDAR_NEW_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_CALENDAR_NEW_SETTINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        calendarNewSettings: (action as LoadCalendarNewSettingsSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_CALENDAR_NEW_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadCalendarNewSettingsFailure).payload,
      };
    }

    case SAVE_CALENDAR_NEW_SETTINGS: {
      return {
        ...state,
        calendarNewSettings: (action as SaveCalendarNewSettings).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default calendarNewSettingsReducer;
