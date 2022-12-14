import axios from 'axios';

export function fetchThemeData(
  portalUuid: string | undefined,
  fullTextSearch?: string,
  page?: number,
  pageSize?: number,
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/list/`,
    {
      portalUuid: portalUuid,
      fullTextSearch: fullTextSearch || '',
      page: page || 1,
      pageSize: pageSize || 15,
    }
  );
}

export function createTheme(
  portalUuid: string | undefined,
  name: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/create`,
    { name, portalUuid }
  );
}

export function retrieveMenuThemes(portalUuid: string | undefined): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/list?visibility=true&published=true`
  );
}

export function deleteTheme(themeId: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/${themeId}`
  );
}
