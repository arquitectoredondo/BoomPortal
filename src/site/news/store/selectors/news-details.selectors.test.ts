import {
  selectNewDetails,
  selectNewDetailsState,
  selectNewDetailsLoading,
  selectNewDetailsError,
  selectNewDetailsErrorMsg,
} from './news-details.selectors';

const appState: any = {
  newDetails: {
    newData: undefined,
    loading: false,
    error: true,
    errorMsg: 'error',
  },
};

describe('new details selectors', () => {
  it('should handle selectNewDetailsState', () => {
    expect(selectNewDetailsState(appState)).toEqual({
      newData: undefined,
      loading: false,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle selectNewDetails', () => {
    expect(selectNewDetails(appState)).toEqual(undefined);
  });

  it('should handle selectNewDetailsLoading', () => {
    expect(selectNewDetailsLoading(appState)).toEqual(false);
  });

  it('should handle selectNewDetailsError', () => {
    expect(selectNewDetailsError(appState)).toEqual(true);
  });

  it('should handle selectNewDetailsErrorMsg', () => {
    expect(selectNewDetailsErrorMsg(appState)).toEqual('error');
  });
});
