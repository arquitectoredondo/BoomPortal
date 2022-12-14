import { PortalJournalPagesActionTypes, LOAD_PORTAL_JOURNAL_PAGES, LOAD_PORTAL_JOURNAL_PAGES_SUCCESS, LoadPortalJournalPagesSuccess, LOAD_PORTAL_JOURNAL_PAGES_FAILURE, LoadPortalJournalPagesFailure } from "../actions/journal-pages.types";


export interface PortalJournalPagesState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pages: any[];
}

const initialState: PortalJournalPagesState = {
  loading: false,
  error: false,
  pages: [],
  errorMsg: '',
};

const portalJournalPagesReducer = (
  state: PortalJournalPagesState = initialState,
  action: PortalJournalPagesActionTypes
) => {
  switch (action.type) {
    case LOAD_PORTAL_JOURNAL_PAGES: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_JOURNAL_PAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        pages: (action as LoadPortalJournalPagesSuccess).payload,
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_JOURNAL_PAGES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: (action as LoadPortalJournalPagesFailure).payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default portalJournalPagesReducer;
