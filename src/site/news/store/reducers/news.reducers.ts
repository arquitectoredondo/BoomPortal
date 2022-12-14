import {
  NewsActionTypes,
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_FAILURE,
  LoadNewsSuccess,
  LoadNewsFailure,
} from '../actions/news.types';
import { PortalNew } from '../../model/news.model';

export interface NewsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  news: PortalNew[];
}

const initialState: NewsState = {
  loading: false,
  error: false,
  errorMsg: '',
  news: [],
};

const newsReducer = (
  state: NewsState = initialState,
  action: NewsActionTypes
) => {
  switch (action.type) {
    case LOAD_NEWS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_NEWS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        news: (action as LoadNewsSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_NEWS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadNewsFailure).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default newsReducer;
