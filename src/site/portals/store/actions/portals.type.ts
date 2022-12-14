import { Portal } from '../../../site/models/portal.model';
export const LOAD_PORTALS: string = '[ADMIN PORTAL] LOAD_PORTALS';
export const LOAD_PORTALS_FAILURE: string =
  '[ADMIN PORTAL] LOAD_PORTALS_FAILURE';
export const LOAD_PORTALS_SUCCESS: string =
  '[ADMIN PORTAL] LOAD_PORTALS_SUCCESS';
export const OPEN_CLOSE_CREATE_DIALOG: string =
  '[ADMIN PORTAL] OPEN_CLOSE_CREATE_DIALOG';

export interface LoadPortalsSuccess {
  type: typeof LOAD_PORTALS_SUCCESS;
  payload: Portal[];
}

export interface LoadPortalsFailure {
  type: typeof LOAD_PORTALS_FAILURE;
  payload: string;
}

export interface LoadPortals {
  type: typeof LOAD_PORTALS;
}

export interface OpenCloseCreateDialog {
  type: typeof OPEN_CLOSE_CREATE_DIALOG;
  payload: boolean;
}

export type PortalActionTypes =
  | LoadPortalsSuccess
  | LoadPortalsFailure
  | LoadPortals
  | OpenCloseCreateDialog;
