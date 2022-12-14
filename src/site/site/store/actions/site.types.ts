import { Portal } from '../../models/portal.model';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

export const PORTAL_SELECTED: string = '[ADMIN PORTALS] PORTAL SELECTED';
export const JOURNAL_SELECTED: string = '[ADMIN JOURNAL] JOURNAL_SELECTED ';
export const DATABASE_SELECTED: string = '[ADMIN DATABASE] DATABASE_SELECTED ';
export const CALENDAR_NEW_SELECTED: string =
  '[ADMIN CALENDAR NEW] CALENDAR NEW_SELECTED ';

export interface PortalSelected {
  type: typeof PORTAL_SELECTED;
  payload: Portal | undefined;
}

export interface JournalSelected {
  type: typeof JOURNAL_SELECTED;
  payload: Journal | undefined;
}

export interface DatabaseSelected {
  type: typeof DATABASE_SELECTED;
  payload: Database | undefined;
}

export interface CalendarNewSelected {
  type: typeof CALENDAR_NEW_SELECTED;
  payload: Journal | undefined;
}

export type SiteActionTypes =
  | PortalSelected
  | JournalSelected
  | DatabaseSelected
  | CalendarNewSelected;
