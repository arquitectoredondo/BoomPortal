import { Journal } from '../../../site/models/journal.model';
import {
  JournalActionTypes,
  LOAD_JOURNALS,
  LOAD_JOURNALS_FAILURE,
  LOAD_JOURNALS_SUCCESS,
  OPEN_CLOSE_CREATE_DIALOG,
  OpenCloseCreateDialog,
  LoadJournalsSuccess,
  LoadJournalsFailure,
} from '../actions/journals.type';

export interface JournalState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
  journals: Journal[];
}

const initialState: JournalState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: '',
  journals: [],
};

const journalReducer = (
  state: JournalState = initialState,
  action: JournalActionTypes
) => {
  switch (action.type) {
    case LOAD_JOURNALS: {
      return {
        ...state,
        loading: true,
        error: false,
        journals: [],
        errorMsg: '',
      };
    }
    case LOAD_JOURNALS_SUCCESS: {
      const payload: Journal[] = (action as LoadJournalsSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        journals: payload,
        errorMsg: '',
      };
    }
    case LOAD_JOURNALS_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
        journals: [],
        errorMsg: (action as LoadJournalsFailure).payload,
      };
    }

    case OPEN_CLOSE_CREATE_DIALOG: {
      return {
        ...state,
        dialogOpen: (action as OpenCloseCreateDialog).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default journalReducer;
