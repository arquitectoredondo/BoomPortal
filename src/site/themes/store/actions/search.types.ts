import { Publication } from '../../../catalog/models/portal.catalog.model';
export const ADD_SEARCH_VALUE: string = '[SEARCH] ADD_SEARCH_VALUE';
export const ADD_SUBMIT_VALUE: string = '[SEARCH] ADD_SUBMIT_VALUE';
export const CLEAR_SEARCH_VALUE: string = '[SEARCH] CLEAR_SEARCH_VALUE';
export const CLEAR_COINCIDENCE_LIST: string = '[SEARCH] CLEAR_COINCIDENCE_LIST';
export const GET_COINCIDENCE_LIST: string = '[SEARCH] GET_COINCIDENCE_LIST';
export const GET_COINCIDENCE_LIST_SUCCESS: string =
  '[SEARCH] GET_COINCIDENCE_LIST_SUCCESS';
export const GET_COINCIDENCE_LIST_FAILURE: string =
  '[SEARCH] GET_COINCIDENCE_LIST_FAILURE';

export interface AddSearchValue {
  type: typeof ADD_SEARCH_VALUE;
  payload: string;
}

export interface AddSubmitValue {
  type: typeof ADD_SUBMIT_VALUE;
  payload: string;
}

export interface ClearSearchTerm {
  type: typeof CLEAR_SEARCH_VALUE;
}

export interface ClearCoincidenceList {
  type: typeof CLEAR_COINCIDENCE_LIST;
}

export interface GetCoincidenceList {
  type: typeof GET_COINCIDENCE_LIST;
}

export interface GetCoincidenceListSuccess {
  type: typeof GET_COINCIDENCE_LIST_SUCCESS;
  payload: Publication[];
}

export interface GetCoincidenceListFailure {
  type: typeof GET_COINCIDENCE_LIST_FAILURE;
}

export type SearchActionTypes =
  | AddSearchValue
  | AddSubmitValue
  | ClearSearchTerm
  | ClearCoincidenceList
  | GetCoincidenceList
  | GetCoincidenceListSuccess
  | GetCoincidenceListFailure;
