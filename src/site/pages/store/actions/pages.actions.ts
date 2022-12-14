import {
  LOAD_PORTAL_PAGES,
  PortalPagesActionTypes,
  LOAD_PORTAL_PAGES_SUCCESS,
  LOAD_PORTAL_PAGES_FAILURE,
} from './pages.types';

export const loadPortalPages = (): PortalPagesActionTypes => ({
  type: LOAD_PORTAL_PAGES,
});

export const loadPortalPagesSuccess = (pages: any): PortalPagesActionTypes => ({
  type: LOAD_PORTAL_PAGES_SUCCESS,
  payload: pages,
});

export const loadPortalPagesFailure = (
  error: string
): PortalPagesActionTypes => ({
  type: LOAD_PORTAL_PAGES_FAILURE,
  payload: error,
});
