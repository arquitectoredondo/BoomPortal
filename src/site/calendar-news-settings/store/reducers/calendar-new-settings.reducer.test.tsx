import reducer from './calendar-new-settings.reducer';
import { CalendarNewSettings } from '../../models/calendar-new-settings.model';
import { CalendarNewSettingsState } from './calendar-new-settings.reducer';
import {
  loadCalendarNewSettings,
  loadCalendarNewSettingsSuccess,
  loadCalendarNewSettingsFailure,
  saveCalendarNewSettings,
  publishCalendarNewSettings,
} from '../actions/calendar-new-settings.actions';

const initialState: CalendarNewSettingsState = {
  loading: false,
  error: false,
  calendarNewSettings: undefined,
  errorMsg: '',
};

const calendarNewSettingsMock: CalendarNewSettings = {
  uuid: '1',
  canRevert: false,
  editedBy: 'person',
  name: 'name',
  menuItems: [],
  colour: '#000',
  visibility: true,
};

describe('Calendar New settings reducer', () => {
  it('should handle LOAD_CALENDAR_NEW_SETTINGS', () => {
    expect(reducer(initialState, loadCalendarNewSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      calendarNewSettings: undefined,
    });
  });

  it('should handle LOAD_CALENDAR_NEW_SETTINGS_SUCCESS', () => {
    expect(
      reducer(
        initialState,
        loadCalendarNewSettingsSuccess(calendarNewSettingsMock)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      calendarNewSettings: calendarNewSettingsMock,
    });
  });

  it('should handle LOAD_CALENDAR_NEW_SETTINGS_FAILURE', () => {
    expect(
      reducer(initialState, loadCalendarNewSettingsFailure('error'))
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle SAVE_CALENDAR_NEW_SETTINGS', () => {
    expect(
      reducer(initialState, saveCalendarNewSettings(calendarNewSettingsMock))
    ).toEqual({
      ...initialState,
      calendarNewSettings: calendarNewSettingsMock,
    });
  });

  it('should handle PUBLISH_CALENDAR_NEW_SETTINGS', () => {
    expect(reducer(initialState, publishCalendarNewSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });
});
