import {
  selectCalendarNewsPagesState,
  selectCalendarNewsPages,
  selectCalendarNewsPagesLoading,
  selectCalendarNewsPagesError,
  selectCalendarNewsPagesErrorMsg,
} from './calendar-news-pages.selectors';

const appState: any = {
  calendarNewsPages: {
    pages: [],
    loading: false,
    error: true,
    errorMsg: 'e',
  },
};

describe('pages selectors', () => {
  it('should handle selectCalendarNewsPagesState', () => {
    expect(selectCalendarNewsPagesState(appState)).toEqual({
      pages: [],
      loading: false,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle selectCalendarNewsPages', () => {
    expect(selectCalendarNewsPages(appState)).toEqual([]);
  });

  it('should handle selectCalendarNewsPagesLoading', () => {
    expect(selectCalendarNewsPagesLoading(appState)).toEqual(false);
  });

  it('should handle selectCalendarNewsPagesError', () => {
    expect(selectCalendarNewsPagesError(appState)).toEqual(true);
  });

  it('should handle selectCalendarNewsPagesErrorMsg', () => {
    expect(selectCalendarNewsPagesErrorMsg(appState)).toEqual('e');
  });
});
