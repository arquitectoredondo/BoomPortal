import {
  selectSearchState,
  selectSearchValue,
  selectSubmitSearchValue,
  selectCoincidenceList,
  selectCoincidenceListPending,
  selectCoincidenceListError,
} from './search.selectors';

const appState: any = {
  search: {
    searchValue: '',
    submitValue: '',
    coincidenceList: {},
    error: true,
    pending: false,
  },
};

describe('Theme search selectors', () => {
  it('should handle selectSearchState', () => {
    expect(selectSearchState(appState)).toEqual({
      searchValue: '',
      submitValue: '',
      coincidenceList: {},
      error: true,
      pending: false,
    });
  });

  it('should handle selectSearchValue', () => {
    expect(selectSearchValue(appState)).toEqual('');
  });

  it('should handle selectSubmitSearchValue', () => {
    expect(selectSubmitSearchValue(appState)).toEqual('');
  });

  it('should handle selectCoincidenceListError', () => {
    expect(selectCoincidenceListError(appState)).toEqual(true);
  });

  it('should handle selectCoincidenceListPending', () => {
    expect(selectCoincidenceListPending(appState)).toEqual(false);
  });
  it('should handle selectCoincidenceList', () => {
    expect(selectCoincidenceList(appState)).toEqual({});
  });
});
