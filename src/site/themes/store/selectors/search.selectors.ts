import { AppState } from '../../../../core/store/store';
import { SearchState } from '../reducers/search.reducer';
import { Publication } from '../../../catalog/models/portal.catalog.model';

export const selectSearchState = (store: AppState): SearchState => store.search;

export const selectSearchValue = (store: AppState): string =>
  selectSearchState(store).searchValue;

export const selectSubmitSearchValue = (store: AppState): string =>
  selectSearchState(store).submitValue;

export const selectCoincidenceList = (store: AppState): Publication[] =>
  selectSearchState(store).coincidenceList;

export const selectCoincidenceListPending = (store: AppState): boolean =>
  selectSearchState(store).pending;

export const selectCoincidenceListError = (store: AppState): boolean =>
  selectSearchState(store).error;
