import {
  LOAD_NEWS_DETAILS,
  NewsDetailsActionTypes,
  LOAD_NEWS_DETAILS_SUCCESS,
  LoadNewsDetailsSuccess,
  LOAD_NEWS_DETAILS_FAILURE,
  RESET_NEWS_DETAILS,
  LOAD_NEWS_TAXONOMY_SUCCESS,
  LOAD_NEWS_PUBLICATIONS_SUCCESS,
  LoadNewsDetailsFailure,
  CLOSE_ERROR_NEWS_DETAILS,
} from '../actions/news-details.types';
import { NewData } from '../../model/news.model';

export interface NewsDetailsState {
  loading: boolean;
  error: boolean;
  newData: NewData | undefined;
  errorMsg: string;
}

const initialState: NewsDetailsState = {
  loading: false,
  error: false,
  newData: undefined,
  errorMsg: '',
};

const newsReducer = (
  state: NewsDetailsState = initialState,
  action: NewsDetailsActionTypes
) => {
  switch (action.type) {
    case LOAD_NEWS_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_NEWS_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        newData: (action as LoadNewsDetailsSuccess).payload,
      };
    }

    case LOAD_NEWS_TAXONOMY_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        newData: {
          ...state.newData,
          assignedTaxonomies: (action as LoadNewsDetailsSuccess).payload,
        },
      };
    }

    case LOAD_NEWS_PUBLICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        newData: {
          ...state.newData,
          relatedPublications: (action as LoadNewsDetailsSuccess).payload,
        },
      };
    }

    case LOAD_NEWS_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadNewsDetailsFailure).payload,
      };
    }

    case RESET_NEWS_DETAILS: {
      return {
        ...state,
        newData: undefined,
      };
    }

    case CLOSE_ERROR_NEWS_DETAILS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
      };
    }

    default: {
      return state;
    }
  }
};

export default newsReducer;
