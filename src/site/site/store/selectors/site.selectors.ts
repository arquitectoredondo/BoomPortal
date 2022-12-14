import { AppState } from '../../../../core/store/store';
import { SiteState } from '../reducers/site.reducer';
import { Portal } from '../../models/portal.model';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

export const selectSiteState = (store: AppState): SiteState => store.site;

export const selectPortal = (store: AppState): Portal | undefined =>
  selectSiteState(store)?.portal;

export const selectJournal = (store: AppState): Journal | undefined =>
  selectSiteState(store)?.journal;

export const selectDatabase = (store: AppState): Database | undefined =>
  selectSiteState(store)?.database;

export const selectCalendarNew = (store: AppState): Journal | undefined =>
  selectSiteState(store)?.calendarNew;
