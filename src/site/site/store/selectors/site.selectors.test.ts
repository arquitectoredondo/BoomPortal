import {
  selectSiteState,
  selectPortal,
  selectJournal,
  selectDatabase,
  selectCalendarNew,
} from './site.selectors';

const appState: any = {
  site: {
    portal: undefined,
    journal: undefined,
    database: undefined,
    calendarNew: undefined,
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalsState', () => {
    expect(selectSiteState(appState)).toEqual({
      portal: undefined,
      journal: undefined,
      database: undefined,
      calendarNew: undefined,
    });
  });

  it('should handle selectPortals', () => {
    expect(selectPortal(appState)).toEqual(undefined);
  });

  it('should handle selectPortalsPending', () => {
    expect(selectJournal(appState)).toEqual(undefined);
  });

  it('should handle selectDatabase', () => {
    expect(selectDatabase(appState)).toEqual(undefined);
  });

  it('should handle selectCalendarNew', () => {
    expect(selectCalendarNew(appState)).toEqual(undefined);
  });
});
