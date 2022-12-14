import {
  PortalPagesDetailsActionTypes,
  LOAD_PORTAL_PAGES_DETAILS,
  LOAD_PORTAL_PAGES_DETAILS_SUCCESS,
  LOAD_PORTAL_PAGES_DETAILS_FAILURE,
  UPDATE_PORTAL_PAGES_DETAILS,
  UPDATE_PORTAL_PAGES_DETAILS_SUCCESS,
  UPDATE_PORTAL_PAGES_DETAILS_FAILURE,
} from './page-details.types';
import { PageDetails } from '../../models/page.model';

export const loadPortalPageDetails = (): PortalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_PAGES_DETAILS,
});

export const loadPortalPageDetailsSuccess = (
  pageDetails: PageDetails
): PortalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_PAGES_DETAILS_SUCCESS,
  payload: pageDetails,
});

export const loadPortalPageDetailsFailure = (
  error: string
): PortalPagesDetailsActionTypes => ({
  type: LOAD_PORTAL_PAGES_DETAILS_FAILURE,
  payload: error,
});

export const updatePortalPageDetails = (): PortalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_PAGES_DETAILS,
});

export const updatePortalPageDetailsSuccess = (
  newData: PageDetails
): PortalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_PAGES_DETAILS_SUCCESS,
  payload: newData,
});

export const updatePortalPageDetailsFailure = (
  error: string
): PortalPagesDetailsActionTypes => ({
  type: UPDATE_PORTAL_PAGES_DETAILS_FAILURE,
  payload: error,
});
