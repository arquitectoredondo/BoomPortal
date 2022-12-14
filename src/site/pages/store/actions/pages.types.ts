export const LOAD_PORTAL_PAGES: string = '[PAGES] LOAD_PORTAL_PAGES';
export const LOAD_PORTAL_PAGES_SUCCESS: string =
  '[PAGES] LOAD_PORTAL_PAGES_SUCCESS';
export const LOAD_PORTAL_PAGES_FAILURE: string =
  '[PAGES] LOAD_PORTAL_PAGES_FAILURE';

export interface LoadPortalPages {
  type: typeof LOAD_PORTAL_PAGES;
}

export interface LoadPortalPagesSuccess {
  type: typeof LOAD_PORTAL_PAGES_SUCCESS;
  payload: any;
}

export interface LoadPortalPagesFailure {
  type: typeof LOAD_PORTAL_PAGES_FAILURE;
  payload: string;
}

export type PortalPagesActionTypes =
  | LoadPortalPages
  | LoadPortalPagesSuccess
  | LoadPortalPagesFailure;
