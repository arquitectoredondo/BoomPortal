import reducer, { NewsState } from './news.reducers';
import {
  loadNews,
  loadNewsSuccess,
  loadNewsFailure,
} from '../actions/news.actions';

const initialState: NewsState = {
  loading: false,
  error: false,
  errorMsg: '',
  news: [],
};

describe('news reducer', () => {
  it('should handle LOAD_NEWS', () => {
    expect(reducer(initialState, loadNews())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_NEWS_SUCCESS', () => {
    expect(reducer(initialState, loadNewsSuccess([]))).toEqual({
      ...initialState,
      news: [],
    });
  });

  it('should handle LOAD_NEWS_FAILURE', () => {
    expect(reducer(initialState, loadNewsFailure('error'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'error',
    });
  });
});
