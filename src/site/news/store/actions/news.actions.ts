import {
  LOAD_NEWS,
  NewsActionTypes,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_FAILURE,
} from './news.types';

export const loadNews = (): NewsActionTypes => ({
  type: LOAD_NEWS,
});

export const loadNewsSuccess = (news: any): NewsActionTypes => ({
  type: LOAD_NEWS_SUCCESS,
  payload: news,
});

export const loadNewsFailure = (error: string): NewsActionTypes => ({
  type: LOAD_NEWS_FAILURE,
  payload: error
});
