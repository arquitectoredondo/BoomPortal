import axios from "axios";
import { DatabaseSettings } from "../models/database-settings.model";

export function getDatabaseSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/${id}`
  );
}

export function saveDraftDatabaseSettings(
  settings: DatabaseSettings
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/update`,
    settings
  );
}

export function revertDatabaseSettings(id: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/revert/${id}`
  );
}

export function publishDatabaseSettings(id: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/publish/${id}`
  );
}

export function retrieveDatabaseList(selectedDatabaseId?: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/search?page=1&size=100&id=${selectedDatabaseId}`
  );
}

export function deleteDatabase(id: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/${id}`
  );
}


