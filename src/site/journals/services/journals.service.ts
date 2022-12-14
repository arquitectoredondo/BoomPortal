import axios from 'axios';

export function fetchJournalsData(
  page?: number,
  pageSize?: number,
  fullTextSearch?: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/list`,
    {
      page: page || 1,
      pageSize: pageSize || 20,
      fullTextSearch
    }
  );
}
//post
/* ,
{
  page: page || 1,
  pageSize: pageSize || 15,
} */

export function createJournal(name: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/create`,
    { name }
  );
}
