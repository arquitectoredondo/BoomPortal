import axios from 'axios';

export function fetchDatabasesData(
  page?: number,
  pageSize?: number,
  fullTextSearch?: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/list`,
    {
      page: page || 1,
      pageSize: pageSize || 20,
      fullTextSearch
    }
  );
}

export function createDatabase(name: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/create`,
    { name }
  );
}
