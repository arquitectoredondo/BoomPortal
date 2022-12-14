import axios from 'axios';

export function getThemeCatalog(themeId: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/settings/${themeId}`
  );
}

export function updateThemeCatalog(catalog: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/update`,
    catalog
  );
}

export function getThemeYearsList(themeId: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/settings/years/${themeId}`
  );
}

export function searchThemePublication(
  searchTerm: string,
  id: string
): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/publications/${id}?searchTerm=${searchTerm}`
  );
}
