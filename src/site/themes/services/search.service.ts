import { SearchCriteria } from '../models/search-criteria.model';
import axios from 'axios';

export async function fetchCoincidenceList(
  searchCriteria: SearchCriteria
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/listbooks`,
    searchCriteria
  );
}
