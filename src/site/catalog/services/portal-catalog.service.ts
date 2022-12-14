import axios from 'axios';
export function getPortalCatalog(portalUuid: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalog/${portalUuid}`
  );
}

export function saveDraftPortalCatalog(settings: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalog/update`,
    settings
  );
}

export function getYearsList(portalUuid: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/settings/years/${portalUuid}`
  );
}

export function searchPublication(searchTerm: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/publications?searchTerm=${searchTerm}`
  );
}
