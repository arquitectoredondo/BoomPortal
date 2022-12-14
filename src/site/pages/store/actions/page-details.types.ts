import { PageDetails } from '../../models/page.model';

export const LOAD_PORTAL_PAGES_DETAILS: string =
  '[PAGES] LOAD_PORTAL_PAGES_DETAILS';
export const LOAD_PORTAL_PAGES_DETAILS_SUCCESS: string =
  '[PAGES] LOAD_PORTAL_PAGES_DETAILS_SUCCESS';
export const LOAD_PORTAL_PAGES_DETAILS_FAILURE: string =
  '[PAGES] LOAD_PORTAL_PAGES_DETAILS_FAILURE';

export const UPDATE_PORTAL_PAGES_DETAILS: string =
  '[PAGES] UPDATE_PORTAL_PAGES_DETAILS';
export const UPDATE_PORTAL_PAGES_DETAILS_SUCCESS: string =
  '[PAGES] UPDATE_PORTAL_PAGES_DETAILS_SUCCESS';
export const UPDATE_PORTAL_PAGES_DETAILS_FAILURE: string =
  '[PAGES] UPDATE_PORTAL_PAGES_DETAILS_FAILURE';

export interface LoadPortalPagesDetails {
  type: typeof LOAD_PORTAL_PAGES_DETAILS;
}

export interface LoadPortalPagesDetailsSuccess {
  type: typeof LOAD_PORTAL_PAGES_DETAILS_SUCCESS;
  payload: PageDetails;
}

export interface LoadPortalPagesDetailsFailure {
  type: typeof LOAD_PORTAL_PAGES_DETAILS_FAILURE;
  payload: string;
}

export interface UpdatePortalPagesDetails {
  type: typeof UPDATE_PORTAL_PAGES_DETAILS;
}

export interface UpdatePortalPagesDetailsSuccess {
  type: typeof UPDATE_PORTAL_PAGES_DETAILS_SUCCESS;
  payload: PageDetails;
}

export interface UpdatePortalPagesDetailsFailure {
  type: typeof UPDATE_PORTAL_PAGES_DETAILS_FAILURE;
  payload: string;
}

export type PortalPagesDetailsActionTypes =
  | LoadPortalPagesDetails
  | LoadPortalPagesDetailsSuccess
  | LoadPortalPagesDetailsFailure
  | UpdatePortalPagesDetails
  | UpdatePortalPagesDetailsSuccess
  | UpdatePortalPagesDetailsFailure;
