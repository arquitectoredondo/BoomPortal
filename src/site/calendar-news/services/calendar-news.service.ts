import axios from 'axios';

export function fetchCalendarNewsData(
  page?: number,
  pageSize?: number
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/list`,
    {
      page: page || 1,
      pageSize: pageSize || 20,
    }
  );
}

export function createCalendarNew(name: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/create`,
    { name }
  );
}
