import { AppState } from '../../../../core/store/store';
import { NewsState } from '../reducers/news.reducers';
import { PortalNew } from '../../model/news.model';

export const selectNewsState = (store: AppState): NewsState => store.news;

export const selectNews = (store: AppState): PortalNew[] =>
  selectNewsState(store).news;

export const selectNewsLoading = (store: AppState): boolean =>
  selectNewsState(store).loading;

export const selectNewsError = (store: AppState): boolean =>
  selectNewsState(store).error;

export const selectNewsErrorMsg = (store: AppState): string =>
  selectNewsState(store).errorMsg;
