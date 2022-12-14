import axios from "axios";
import { JournalSettings } from "../models/journal-settings.model";

export function getJournalSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/${id}`
  );
}

export function saveDraftJournalSettings(
  settings: JournalSettings
): Promise<any> {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/update`,
    settings
  );
}

export function revertJournalSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/revert/${id}`
  );
}

export function publishJournalSettings(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/publish/${id}`
  );
}

export function addMenuItemJournalSettings(menuItem: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/addmenuitem`,
    menuItem
  );
}

export function deleteMenuItemJournalSettings(
  itemId: string,
  journalId: string | undefined
): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/menuitem/${journalId}/${itemId}`
  );
}

export function retrievePages(id: string | undefined): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/${id}`
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
      fullTextSearch: fullTextSearch || "",
      page: 1,
      pageSize: 20,
    }
  );
}

export function retrieveJournalList(selectedJournalId?: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/boom/journals?page=1&size=100&id=${selectedJournalId}`
  );
}

export function deleteJournal(id: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/${id}`
  );
}
