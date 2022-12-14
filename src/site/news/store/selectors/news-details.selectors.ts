import { AppState } from '../../../../core/store/store';
import { NewsDetailsState } from '../reducers/news-details.reducers';
import { NewData } from '../../model/news.model';

export const selectNewDetailsState = (store: AppState): NewsDetailsState =>
  store.newDetails;

export const selectNewDetails = (store: AppState): NewData | undefined =>
  selectNewDetailsState(store).newData;

export const selectNewDetailsLoading = (store: AppState): boolean =>
  selectNewDetailsState(store).loading;

export const selectNewDetailsError = (store: AppState): boolean =>
  selectNewDetailsState(store).error;

export const selectNewDetailsErrorMsg = (store: AppState): string =>
  selectNewDetailsState(store).errorMsg;
