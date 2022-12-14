import {
  selectCalendarNewsState,
  selectCalendarNewsPending,
  selectCalendarNewsError,
  selectCalendarNews,
  selectCalendarNewDialogOpen,
  selectCalendarNewsErrorMsg,
} from './calendar-news.selectors';

const appState: any = {
  calendarNews: {
    calendarNews: [],
    loading: false,
    error: true,
    errorMsg: 'error',
    dialogOpen: false,
  },
};

describe('Journal selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectCalendarNewsState(appState)).toEqual({
      calendarNews: [],
      loading: false,
      error: true,
      dialogOpen: false,
      errorMsg: 'error',
    });
  });

  it('should handle selectCalendarNews', () => {
    expect(selectCalendarNews(appState)).toEqual([]);
  });

  it('should handle selectCalendarNewsPending', () => {
    expect(selectCalendarNewsPending(appState)).toEqual(false);
  });

  it('should handle selectCalendarNewsError', () => {
    expect(selectCalendarNewsError(appState)).toEqual(true);
  });

  it('should handle selectCalendarNewsErrorMsg', () => {
    expect(selectCalendarNewsErrorMsg(appState)).toEqual('error');
  });

  it('should handle selectCalendarNewDialogOpen', () => {
    expect(selectCalendarNewDialogOpen(appState)).toEqual(false);
  });
});
