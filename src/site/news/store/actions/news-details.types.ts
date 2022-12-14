import { NewData, NewRelatedPublication } from '../../model/news.model';

export const LOAD_NEWS_DETAILS: string = '[NEWS] LOAD_NEWS_DETAILS';
export const LOAD_NEWS_DETAILS_SUCCESS: string =
  '[NEWS] LOAD_NEWS_DETAILS_SUCCESS';
export const LOAD_NEWS_TAXONOMY_SUCCESS: string =
  '[NEWS] LOAD_NEWS_DETAILS_TAXONOMY_SUCCESS';
export const LOAD_NEWS_PUBLICATIONS_SUCCESS: string =
  '[NEWS] LOAD_NEWS_DETAILS_PUBLICATIONS_SUCCESS';
export const LOAD_NEWS_DETAILS_FAILURE: string =
  '[NEWS] LOAD_NEWS_DETAILS_FAILURE';
export const RESET_NEWS_DETAILS: string = '[NEWS] RESET_NEWS_DETAILS';
export const CLOSE_ERROR_NEWS_DETAILS: string =
  '[NEWS] CLOSE_ERROR_NEWS_DETAILS';

export interface LoadNewsDetails {
  type: typeof LOAD_NEWS_DETAILS;
}

export interface LoadNewsDetailsSuccess {
  type: typeof LOAD_NEWS_DETAILS_SUCCESS;
  payload: NewData;
}

export interface LoadNewsTaxonomySuccess {
  type: typeof LOAD_NEWS_TAXONOMY_SUCCESS;
  payload: any;
}

export interface LoadNewsPublicationsSuccess {
  type: typeof LOAD_NEWS_PUBLICATIONS_SUCCESS;
  payload: NewRelatedPublication[];
}

export interface LoadNewsDetailsFailure {
  type: typeof LOAD_NEWS_DETAILS_FAILURE;
  payload: string;
}

export interface ResetNewsDetais {
  type: typeof RESET_NEWS_DETAILS;
}

export interface CloseErrorNewDetails {
  type: typeof RESET_NEWS_DETAILS;
}

export type NewsDetailsActionTypes =
  | LoadNewsDetails
  | LoadNewsDetailsSuccess
  | LoadNewsTaxonomySuccess
  | LoadNewsPublicationsSuccess
  | LoadNewsDetailsFailure
  | CloseErrorNewDetails
  | ResetNewsDetais;
