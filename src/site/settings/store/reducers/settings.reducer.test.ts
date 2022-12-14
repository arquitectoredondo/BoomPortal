import reducer from './settings.reducers';
import { PortalSettingsState } from './settings.reducers';
import { PortalSettings } from '../../models/portal-settings.model';
import {
  loadPortalSettings,
  loadPortalSettingsSuccess,
  loadPortalSettingsFailure,
  savePortalSettings,
  publishPortalSettings,
} from '../actions/settings.actions';

const initialState: PortalSettingsState = {
  loading: false,
  error: false,
  portalSettings: undefined,
  errorMsg: '',
};

const portalSettingsMock: PortalSettings = {
  id: '1',
  canRevert: false,
  name: 'name',
  htmlFavicon: 'favicon',
  logo: 'logo',
  domain: 'domain',
  menuItems: [],
  colorPrimary: '#000',
  colorSecondary: '#000',
  colorMainMenu: '#000',
  colorSecondaryMenu: '#000',
  fontPrimary: 'helvetica',
  fontSecondary: 'helvetica',
  languages: ['en','nl'],
};

describe('portal settings reducer', () => {
  it('should handle LOAD_PORTAL_SETTINGS', () => {
    expect(reducer(initialState, loadPortalSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
      portalSettings: undefined,
    });
  });

  it('should handle LOAD_PORTAL_SETTINGS_SUCCESS', () => {
    expect(
      reducer(initialState, loadPortalSettingsSuccess(portalSettingsMock))
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      portalSettings: portalSettingsMock,
    });
  });

  it('should handle LOAD_PORTAL_SETTINGS_FAILURE', () => {
    expect(reducer(initialState, loadPortalSettingsFailure('message'))).toEqual(
      {
        ...initialState,
        loading: false,
        errorMsg: 'message',
        error: true,
      }
    );
  });

  it('should handle SAVE_PORTAL_SETTINGS', () => {
    expect(
      reducer(initialState, savePortalSettings(portalSettingsMock))
    ).toEqual({
      ...initialState,
      portalSettings: portalSettingsMock,
    });
  });

  it('should handle PUBLISH_PORTAL_SETTINGS', () => {
    expect(reducer(initialState, publishPortalSettings())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });
});
