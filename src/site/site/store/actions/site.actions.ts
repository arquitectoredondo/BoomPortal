import {
  PORTAL_SELECTED,
  SiteActionTypes,
  JOURNAL_SELECTED,
  DATABASE_SELECTED,
  CALENDAR_NEW_SELECTED,
} from './site.types';
import { Portal } from '../../models/portal.model';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

export const portalSelected = (
  portal: Portal | undefined
): SiteActionTypes => ({
  type: PORTAL_SELECTED,
  payload: portal,
});

export const journalSelected = (
  journal: Journal | undefined
): SiteActionTypes => ({
  type: JOURNAL_SELECTED,
  payload: journal,
});

export const databaseSelected = (
  database: Database | undefined
): SiteActionTypes => ({
  type: DATABASE_SELECTED,
  payload: database,
});

export const calendarNewSelected = (
  calendarNew: Journal | undefined
): SiteActionTypes => ({
  type: CALENDAR_NEW_SELECTED,
  payload: calendarNew,
});
