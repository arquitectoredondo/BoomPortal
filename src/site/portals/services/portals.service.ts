import axios from 'axios';

export function fetchPortalsData(
  page?: number,
  pageSize?: number,
  fullTextSearch?: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/list`,
    {
      page: page || 1,
      pageSize: pageSize || 20,
      fullTextSearch
    }
  );
}

export function createPortal(name: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/create`,
    { name }
  );
}
