import {
  PortalActionTypes,
  LOAD_PORTALS,
  LOAD_PORTALS_SUCCESS,
  LOAD_PORTALS_FAILURE,
  OPEN_CLOSE_CREATE_DIALOG
} from './portals.type';
import { Portal } from '../../../site/models/portal.model';

export const loadPortals = (): PortalActionTypes => ({
  type: LOAD_PORTALS
});

export const loadPortalsSuccess = (portals: Portal[]): PortalActionTypes => ({
  type: LOAD_PORTALS_SUCCESS,
  payload: portals
});

export const loadPortalsFailure = (error: string): PortalActionTypes => ({
  type: LOAD_PORTALS_FAILURE,
  payload: error
});

export const openCloseCreationDialog = (value: boolean): PortalActionTypes => ({
  type: OPEN_CLOSE_CREATE_DIALOG,
  payload: value
});