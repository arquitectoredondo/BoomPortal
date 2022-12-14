import { Theme } from '../models/themes.model';
import axios from 'axios';

export function fetchThemeById(themeId: string): Promise<Theme> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/settings/${themeId}`
  );
}

export function saveDrafThemeSettings(themeUpdated: any): Promise<Theme> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/settings/update`,
    themeUpdated
  );
}

export function publishThemeSettings(themeId: string): Promise<Theme> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/publish/${themeId}`
  );
}

export function revertThemeSettings(themeId: string): Promise<Theme> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/revert/${themeId}`
  );
}
