import {
  selectNewsState,
  selectNews,
  selectNewsLoading,
  selectNewsError,
  selectNewsErrorMsg,
} from './news.selectors';

const appState: any = {
  news: {
    news: [],
    loading: false,
    error: true,
    errorMsg: 'e',
  },
};

describe('news selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectNewsState(appState)).toEqual({
      news: [],
      loading: false,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle selectPortalNews', () => {
    expect(selectNews(appState)).toEqual([]);
  });

  it('should handle selectNewsLoading', () => {
    expect(selectNewsLoading(appState)).toEqual(false);
  });

  it('should handle selectNewsError', () => {
    expect(selectNewsError(appState)).toEqual(true);
  });

  it('should handle selectNewsError', () => {
    expect(selectNewsErrorMsg(appState)).toEqual('e');
  });
});
