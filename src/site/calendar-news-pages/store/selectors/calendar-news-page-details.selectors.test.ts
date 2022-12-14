import {
  selectCalendarNewsPageDetailsState,
  selectCalendarNewsPageDetailsLayout,
  selectCalendarNewsPageDetailsLoading,
  selectCalendarNewsPageDetailsError,
  selectCalendarNewsPageDetailsErrorMsg,
  selectCalendarNewsPageDetails,
} from './calendar-news-page-details.selectors';

const appState: any = {
  calendarNewsPageDetails: {
    loading: false,
    error: false,
    errorMsg: 'e',
    pageLayout: { lg: [] },
    pageDetails: undefined,
  },
};

describe('page details selectors', () => {
  it('should handle selectCalendarNewsPageDetailsState', () => {
    expect(selectCalendarNewsPageDetailsState(appState)).toEqual({
      loading: false,
      error: false,
      errorMsg: 'e',
      pageLayout: { lg: [] },
      pageDetails: undefined,
    });
  });

  it('should handle selectJournalPageDetailsLayout', () => {
    expect(selectCalendarNewsPageDetailsLayout(appState)).toEqual({ lg: [] });
  });

  it('should handle selectJournalPageDetailsLoading', () => {
    expect(selectCalendarNewsPageDetailsLoading(appState)).toEqual(false);
  });

  it('should handle selectJournalPageDetailsError', () => {
    expect(selectCalendarNewsPageDetailsError(appState)).toEqual(false);
  });

  it('should handle selectJournalPageDetailsErrorMsg', () => {
    expect(selectCalendarNewsPageDetailsErrorMsg(appState)).toEqual('e');
  });

  it('should handle selectJournalPageDetailsErrorMsg', () => {
    expect(selectCalendarNewsPageDetails(appState)).toEqual(undefined);
  });
});
