import { AppState } from '../../../../core/store/store';
import { PortalPagesDetailsState } from '../reducers/page-details.reducers';
import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { Page } from '../../models/page.model';

export const selectPortalPageDetailsState = (
  store: AppState
): PortalPagesDetailsState => store.pageDetails;

export const selectPortalPageDetailsLayout = (
  store: AppState
): ResponsiveLayout => selectPortalPageDetailsState(store)?.pageLayout;

export const selectPortalPageDetails = (store: AppState): Page | undefined =>
  selectPortalPageDetailsState(store)?.pageDetails;

export const selectPortalPageDetailsLoading = (store: AppState): boolean =>
  selectPortalPageDetailsState(store)?.loading;

export const selectPortalPageDetailsError = (store: AppState): boolean =>
  selectPortalPageDetailsState(store)?.error;

export const selectPortalPageDetailsErrorMsg = (store: AppState): string =>
  selectPortalPageDetailsState(store)?.errorMsg;
