import {
  SearchActionTypes,
  ADD_SEARCH_VALUE,
  CLEAR_SEARCH_VALUE,
  GET_COINCIDENCE_LIST,
  GET_COINCIDENCE_LIST_SUCCESS,
  GET_COINCIDENCE_LIST_FAILURE,
  CLEAR_COINCIDENCE_LIST,
  ADD_SUBMIT_VALUE,
} from './search.types';
import { Publication } from '../../../catalog/models/portal.catalog.model';

export const addSearchValue = (searchValue: string): SearchActionTypes => ({
  type: ADD_SEARCH_VALUE,
  payload: searchValue,
});

export const addSubmitValue = (submitValue: string): SearchActionTypes => ({
  type: ADD_SUBMIT_VALUE,
  payload: submitValue,
});

export const clearSearchValue = (): SearchActionTypes => ({
  type: CLEAR_SEARCH_VALUE,
});

export const clearCoincidenceList = (): SearchActionTypes => ({
  type: CLEAR_COINCIDENCE_LIST,
});

export const getCoincidenceList = (): SearchActionTypes => ({
  type: GET_COINCIDENCE_LIST,
});

export const getCoincidenceListSuccess = (
  list: Publication[]
): SearchActionTypes => ({
  type: GET_COINCIDENCE_LIST_SUCCESS,
  payload: list,
});

export const getCoincidenceListFailure = (): SearchActionTypes => ({
  type: GET_COINCIDENCE_LIST_FAILURE,
});
