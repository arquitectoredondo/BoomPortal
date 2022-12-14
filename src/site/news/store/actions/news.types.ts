export const LOAD_NEWS: string = '[NEWS] LOAD_NEWS';
export const LOAD_NEWS_SUCCESS: string = '[NEWS] LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_FAILURE: string = '[NEWS] LOAD_NEWS_FAILURE';

export interface LoadNews {
  type: typeof LOAD_NEWS;
}

export interface LoadNewsSuccess {
  type: typeof LOAD_NEWS_SUCCESS;
  payload: any;
}

export interface LoadNewsFailure {
  type: typeof LOAD_NEWS_FAILURE;
  payload: string;
}

export type NewsActionTypes =
  | LoadNews
  | LoadNewsSuccess
  | LoadNewsFailure;
