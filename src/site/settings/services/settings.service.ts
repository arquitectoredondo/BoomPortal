import { PortalSettings } from "../models/portal-settings.model";
import axios from "axios";
export function getPortalSettings(portalUuid: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/${portalUuid}`
  );
}
export function saveDraftPortalSettings(
  settings: PortalSettings
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/update`,
    settings
  );
}
export function revertPortalSettings(portalUuid: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/revert/${portalUuid}`
  );
}
export function publishPortalSettings(portalUuid: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/publish/${portalUuid}`
  );
}
export function addMenuItemPortalSettings(menuItem: any): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/addmenuitem`,
    menuItem
  );
}
export function removeMenuItemPortalSettings(
  id: string,
  portalUuid: string | undefined
): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/menuitem/${portalUuid}/${id}`
  );
}
export function retrieveMenuThemes(
  portalUuid: string | undefined
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/list?visibility=true&published=true`,
    {
      portalUuid: portalUuid,
      page: 1,
      pageSize: 40,
    }
  );
}
export function retrieveMenuPages(
  portalUuid: string | undefined
): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/${portalUuid}`
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
export function getAllPages(parentUuid: string | undefined): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/listAllPages/${parentUuid}`
  );
}
export function deletePortal(portalUuid: string | undefined): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/${portalUuid}`
  );
}
