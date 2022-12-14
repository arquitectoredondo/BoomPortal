import reducer, { SiteState } from './site.reducer';
import { Portal } from '../../models/portal.model';
import {
  portalSelected,
  journalSelected,
  databaseSelected,
  calendarNewSelected,
} from '../actions/site.actions';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

const initialState: SiteState = {
  portal: undefined,
  journal: undefined,
  database: undefined,
  calendarNew: undefined,
};

const portalMock: Portal = {
  id: '0',
  name: 'name',
  url: 'url',
  createdBy: 'user',
  creationDate: new Date(),
};

const journalMock: Journal = {
  uuid: 'string;',
  name: 'string;',
  editedBy: 'string;',
  visibility: true,
};

const databaseMock: Database = {
  uuid: 'string;',
  name: 'Database 1;',
  editedBy: 'string;',
  visibility: true,
};

describe('site reducer', () => {
  it('should handle PORTAL_SELECTED', () => {
    expect(reducer(initialState, portalSelected(portalMock))).toEqual({
      portal: portalMock,
    });
  });

  it('should handle JOURNAL_SELECTED', () => {
    expect(reducer(initialState, journalSelected(journalMock))).toEqual({
      journal: journalMock,
    });
  });

  it('should handle DATABASE_SELECTED', () => {
    expect(reducer(initialState, databaseSelected(databaseMock))).toEqual({
      database: databaseMock,
    });
  });

  it('should CALENDAR_NEW_SELECTED', () => {
    expect(reducer(initialState, calendarNewSelected(databaseMock))).toEqual({
      calendarNew: databaseMock,
    });
  });
});
