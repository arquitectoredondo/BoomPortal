import {
  SearchActionTypes,
  AddSearchValue,
  ADD_SEARCH_VALUE,
  CLEAR_SEARCH_VALUE,
  GET_COINCIDENCE_LIST,
  GET_COINCIDENCE_LIST_SUCCESS,
  GET_COINCIDENCE_LIST_FAILURE,
  GetCoincidenceListSuccess,
  CLEAR_COINCIDENCE_LIST,
  ADD_SUBMIT_VALUE,
  AddSubmitValue,
} from '../actions/search.types';
import { Publication } from '../../../catalog/models/portal.catalog.model';
export interface bookInfo {
  title: string;
  id: string;
  publishDate: string;
  author: string;
  pages: number;
  preview: string;
  img: string;
  type: string;
}

export interface SearchState {
  searchValue: string;
  submitValue: string;
  coincidenceList: Publication[];
  error: boolean;
  pending: boolean;
}

const initialState: SearchState = {
  searchValue: '',
  submitValue: '',
  coincidenceList: [],
  error: false,
  pending: false,
};

const searchReducer = (
  state: SearchState = initialState,
  action: SearchActionTypes
) => {
  switch (action.type) {
    case ADD_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: (action as AddSearchValue).payload,
      };
    }

    case ADD_SUBMIT_VALUE: {
      return {
        ...state,
        submitValue: (action as AddSubmitValue).payload,
      };
    }

    case CLEAR_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: '',
      };
    }

    case GET_COINCIDENCE_LIST: {
      return {
        ...state,
        error: false,
        pending: true,
      };
    }

    case GET_COINCIDENCE_LIST_SUCCESS: {
      return {
        ...state,
        error: false,
        pending: false,
        coincidenceList: (action as GetCoincidenceListSuccess).payload,
      };
    }

    case GET_COINCIDENCE_LIST_FAILURE: {
      return {
        ...state,
        error: true,
        pending: false,
      };
    }

    case CLEAR_COINCIDENCE_LIST: {
      return {
        ...state,
        coincidenceList: [],
        searchValue: '',
        submitValue: '',
      };
    }

    default: {
      return state;
    }
  }
};

export default searchReducer;
