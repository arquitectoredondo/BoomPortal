import { ResponsiveLayout } from '../../../../shared/models/layout.model';
import { JournalPage } from '../../models/journal-page.model';
import {
  PortalJournalPagesDetailsActionTypes,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  LoadPortalJournalPagesDetailsSuccess,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS,
  UpdatePortalJournalPagesDetailsSuccess,
  UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
  LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE,
} from '../actions/journal-page-details.types';
import { layoutMapper } from '../../../pages/services/page-details.service';
import { LoadPortalJournalPagesFailure } from '../actions/journal-pages.types';

export interface PortalJournalPagesDetailsState {
  loading: boolean;
  error: boolean;
  errorMsg: string;
  pageLayout: ResponsiveLayout;
  pageDetails: JournalPage | undefined;
}

const initialState: PortalJournalPagesDetailsState = {
  loading: false,
  error: false,
  pageLayout: { lg: [] },
  pageDetails: undefined,
  errorMsg: '',
};

const portalJournalPagesDetailsReducer = (
  state: PortalJournalPagesDetailsState = initialState,
  action: PortalJournalPagesDetailsActionTypes
) => {
  switch (action.type) {
    case UPDATE_PORTAL_JOURNAL_PAGES_DETAILS:
    case LOAD_PORTAL_JOURNAL_PAGES_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false,
        journalPageDetails: undefined,
        pageLayout: { lg: [] },
        errorMsg: '',
      };
    }

    case LOAD_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS: {
      const {
        pageWidgets,
        ...pageDetails
      } = (action as LoadPortalJournalPagesDetailsSuccess).payload;
      return {
        ...state,
        loading: false,
        error: false,
        pageLayout: {
          lg: layoutMapper(pageWidgets || []),
        },
        pageDetails,
        errorMsg: '',
      };
    }

    case UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: '',
        pageDetails: (action as UpdatePortalJournalPagesDetailsSuccess).payload,
      };
    }

    case UPDATE_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE:
    case LOAD_PORTAL_JOURNAL_PAGES_DETAILS_FAILURE: {
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

export default portalJournalPagesDetailsReducer;
