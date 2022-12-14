import axios from 'axios';

export function createThemePage(
  themeId: string | undefined,
  pageCreation: any
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`,
    {
      label: pageCreation.label,
      link: pageCreation.link,
      parentUuid: themeId,
    }
  );
}

export function updateThemePage(page: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/update`,
    page
  );
}
