import { AppState } from '../../../../core/store/store';
import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { ThemePagesDetailsState } from '../reducers/theme-pages-details.reducer';
import { Page } from '../../../pages/models/page.model';

export const selectThemePageDetailsState = (
  store: AppState
): ThemePagesDetailsState => store.themePageDetails;

export const selectThemePageDetailsLayout = (
  store: AppState
): ResponsiveLayout => selectThemePageDetailsState(store)?.pageLayout;

export const selectThemePageDetails = (store: AppState): Page | undefined =>
  selectThemePageDetailsState(store)?.pageDetails;

export const selectThemePageDetailsLoading = (store: AppState): boolean =>
  selectThemePageDetailsState(store)?.loading;

export const selectThemePageDetailsError = (store: AppState): boolean =>
  selectThemePageDetailsState(store)?.error;
