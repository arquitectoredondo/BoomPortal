import axios from 'axios';

import { NewData } from '../model/news.model';
import moment from 'moment';

export function getNews(filters: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/list`,
    filters
  );
}

export function createUpdateNew(newData: NewData): Promise<any> {
  const newNewData = {
    ...newData,
    eventDate: newData.eventDate
      ? moment(newData.eventDate).format('DD/MM/YYYY')
      : null,
    hideOn: newData.hideOn ? moment(newData.hideOn).format('DD/MM/YYYY') : undefined,
    visibleOn: moment(newData.visibleOn).format('DD/MM/YYYY'),
  };
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/`,
    newNewData
  );
}

export function getNewDetails(id: string | undefined): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/${id}`
  );
}

export function saveNewDetailsTaxonomy(
  id: string | undefined,
  taxonomy: any
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/${id}/taxonomy`,
    taxonomy
  );
}

export function searchNewsPublications(
  id: string | undefined,
  searchTerm: string
): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/publications/${id}?searchTerm=${searchTerm}`
  );
}

export function saveNewDetailsPublications(
  id: string | undefined,
  publications: string[]
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/${id}/publications`,
    publications
  );
}

export function publishNewDetails(id: string | undefined): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/publish/${id}`
  );
}

export function revertNewDetails(id: string | undefined): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/revert/${id}`
  );
}

export function getTaxonomyLowerLevel(taxonomy: any) {
  if (taxonomy?.child[0]?.child.length > 0) {
    return taxonomy.child[0].child[0].uuid;
  }

  if (taxonomy?.child.length > 0) {
    return taxonomy.child[0].uuid;
  }

  if (taxonomy) {
    return taxonomy.uuid;
  }
}

export function getSelectedChilds(
  taxonomy: any[],
  domain: string,
  category?: string
) {
  let element: any;
  element = taxonomy.find((tax: any) => tax.uuid === domain);
  if (category && element) {
    element = element.child.find((tax: any) => tax.uuid === category);
  }
  return element ? element.child : [];
}

export function deleteNews(id: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/${id}`
  );
}
