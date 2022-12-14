import reducer from './search.reducer';

import { SearchState } from './search.reducer';
import {
  addSearchValue,
  addSubmitValue,
  clearSearchValue,
  getCoincidenceList,
  getCoincidenceListFailure,
} from '../actions/search.actions';

const initialState: SearchState = {
  searchValue: '',
  submitValue: '',
  coincidenceList: [],
  error: false,
  pending: false,
};

describe('Search reducer', () => {
  it('should handle ADD_SEARCH_VALUE', () => {
    expect(reducer(initialState, addSearchValue('search'))).toEqual({
      ...initialState,
      searchValue: 'search',
    });
  });

  it('should handle ADD_SUBMIT_VALUE', () => {
    expect(reducer(initialState, addSubmitValue('submit'))).toEqual({
      ...initialState,
      submitValue: 'submit',
    });
  });

  it('should handle CLEAR_SEARCH_VALUE', () => {
    expect(reducer(initialState, clearSearchValue())).toEqual({
      ...initialState,
      submitValue: '',
    });
  });

  it('should handle GET_COINCIDENCE_LIST', () => {
    expect(reducer(initialState, getCoincidenceList())).toEqual({
      ...initialState,
      error: false,
      pending: true,
    });
  });

  // it('should handle GET_COINCIDENCE_LIST_SUCCESS', () => {
  //   let coincidenceList: searchPublicationsResults = {
  //     listingBookInfos: [
  //       {
  //         title: 'TEST',
  //         id: 'TEST',
  //         publishDate: 'TEST',
  //         author: 'TEST',
  //         pages: 1,
  //         preview: 'TEST',
  //         img: 'TEST',
  //         type: 'TEST',
  //       },
  //     ],
  //     totalPageNumber: 1,
  //   };
  //   expect(
  //     reducer(initialState, getCoincidenceListSuccess(coincidenceList))
  //   ).toEqual({
  //     ...initialState,
  //     error: false,
  //     pending: false,
  //     coincidenceList: {
  //       listingBookInfos: [
  //         {
  //           title: 'TEST',
  //           id: 'TEST',
  //           publishDate: 'TEST',
  //           author: 'TEST',
  //           pages: 1,
  //           preview: 'TEST',
  //           img: 'TEST',
  //           type: 'TEST',
  //         },
  //       ],
  //       totalPageNumber: 1,
  //     },
  //   });
  // });

  it('should handle GET_COINCIDENCE_LIST_FAILURE', () => {
    expect(reducer(initialState, getCoincidenceListFailure())).toEqual({
      ...initialState,
      error: true,
      pending: false,
    });
  });

  // it('should handle CLEAR_COINCIDENCE_LIST', () => {
  //   expect(reducer(initialState, clearCoincidenceList())).toEqual({
  //     ...initialState,
  //     coincidenceList: {
  //       listingBookInfos: [
  //         {
  //           title: '',
  //           id: '',
  //           publishDate: '',
  //           author: '',
  //           pages: 1,
  //           preview: '',
  //           img: '',
  //           type: '',
  //         },
  //       ],
  //       totalPageNumber: 1,
  //     },
  //   });
  // });
});
