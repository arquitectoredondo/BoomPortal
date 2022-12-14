import axios from 'axios';
import { CalendarNewSettings } from '../models/calendar-new-settings.model';

export function getCalendarNewSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/${id}`
  );
}

export function saveDraftCalendarNewSettings(
  settings: CalendarNewSettings
): Promise<any> {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/update`,
    settings
  );
}

export function revertCalendarNewSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/revert/${id}`
  );
}

export function publishCalendarNewSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/publish/${id}`
  );
}

export function retrieveDatabaseList(selectedDatabaseId?: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/search?page=1&size=100&id=${selectedDatabaseId}`
  );
}

export function deleteCalendarNew(id: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/${id}`
  );
}

export function getPages(
  parentId: string | undefined,
  fullTextSearch?: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`,
    {
      parentUuid: parentId,
      fullTextSearch: fullTextSearch || '',
      page: 1,
      pageSize: 20,
    }
  );
}
