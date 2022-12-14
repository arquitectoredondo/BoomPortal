import {
  NewsDetailsActionTypes,
  LOAD_NEWS_DETAILS,
  LOAD_NEWS_DETAILS_SUCCESS,
  LOAD_NEWS_DETAILS_FAILURE,
  RESET_NEWS_DETAILS,
  LOAD_NEWS_TAXONOMY_SUCCESS,
  LOAD_NEWS_PUBLICATIONS_SUCCESS,
  CLOSE_ERROR_NEWS_DETAILS,
} from './news-details.types';

export const loadNewsDetails = (): NewsDetailsActionTypes => ({
  type: LOAD_NEWS_DETAILS,
});

export const loadNewsDetailsSuccess = (news: any): NewsDetailsActionTypes => ({
  type: LOAD_NEWS_DETAILS_SUCCESS,
  payload: news,
});

export const loadNewsTaxonomySuccess = (
  taxonomy: any
): NewsDetailsActionTypes => ({
  type: LOAD_NEWS_TAXONOMY_SUCCESS,
  payload: taxonomy,
});

export const loadNewsPublicationsSuccess = (
  publications: any
): NewsDetailsActionTypes => ({
  type: LOAD_NEWS_PUBLICATIONS_SUCCESS,
  payload: publications,
});

export const loadNewsDetailsFailure = (
  errorMsg: string
): NewsDetailsActionTypes => ({
  type: LOAD_NEWS_DETAILS_FAILURE,
  payload: errorMsg,
});

export const resetNewsDetails = (): NewsDetailsActionTypes => ({
  type: RESET_NEWS_DETAILS,
});

export const closeErrorNewsDetails = (): NewsDetailsActionTypes => ({
  type: CLOSE_ERROR_NEWS_DETAILS,
});
