import {
  SiteActionTypes,
  PORTAL_SELECTED,
  JOURNAL_SELECTED,
  DATABASE_SELECTED,
  CALENDAR_NEW_SELECTED,
  PortalSelected,
  JournalSelected,
  DatabaseSelected,
  CalendarNewSelected,
} from '..//actions/site.types';
import { Portal } from '../../models/portal.model';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

export interface SiteState {
  portal: Portal | undefined;
  journal: Journal | undefined;
  database: Database | undefined;
  calendarNew: Journal | undefined;
}

const initialState: SiteState = {
  portal: undefined,
  journal: undefined,
  database: undefined,
  calendarNew: undefined,
};

const siteReducer = (
  state: SiteState = initialState,
  action: SiteActionTypes
) => {
  switch (action.type) {
    case PORTAL_SELECTED: {
      const payload: Portal | undefined = (action as PortalSelected).payload;
      return {
        ...state,
        portal: payload,
        journal: undefined,
        database: undefined,
        calendarNew: undefined,
      };
    }

    case JOURNAL_SELECTED: {
      const payload: Journal | undefined = (action as JournalSelected).payload;
      return {
        ...state,
        journal: payload,
        portal: undefined,
        database: undefined,
        calendarNew: undefined,
      };
    }

    case DATABASE_SELECTED: {
      const payload: Database | undefined = (action as DatabaseSelected)
        .payload;
      return {
        ...state,
        database: payload,
        journal: undefined,
        portal: undefined,
        calendarNew: undefined,
      };
    }

    case CALENDAR_NEW_SELECTED: {
      const payload: Journal | undefined = (action as CalendarNewSelected)
        .payload;
      return {
        ...state,
        journal: undefined,
        portal: undefined,
        database: undefined,
        calendarNew: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default siteReducer;
