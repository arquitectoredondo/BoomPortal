import axios from 'axios';

export function getCalendarNewsPages(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/${id}`
  );
}

export function getPages(
  parentId: string | undefined,
  fullTextSearch?: string,
  page?: number,
  pageSize?: number
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`,
    {
      parentUuid: parentId,
      fullTextSearch: fullTextSearch || '',
      page: page || 1,
      pageSize: pageSize || 15,
    }
  );
}

export function createCalendarNewsPage(page: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`,
    page
  );
}

export function updateCalendarNewsPage(page: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/update`,
    page
  );
}

export function deleteCalendarNewsPage(page: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`,
    page
  );
}
