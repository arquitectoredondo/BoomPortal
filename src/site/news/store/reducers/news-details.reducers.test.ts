import reducer from './news-details.reducers';

import {
  loadNewsDetails,
  loadNewsDetailsSuccess,
  loadNewsDetailsFailure,
  resetNewsDetails,
  loadNewsTaxonomySuccess,
  loadNewsPublicationsSuccess,
  closeErrorNewsDetails,
} from '../actions/news-details.actions';
import { NewsDetailsState } from './news-details.reducers';

const initialState: NewsDetailsState = {
  loading: false,
  error: false,
  newData: undefined,
  errorMsg: '',
};

describe('new details reducer', () => {
  it('should handle LOAD_NEWS_DETAILS', () => {
    expect(reducer(initialState, loadNewsDetails())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_NEWS_DETAILS_SUCCESS', () => {
    expect(
      reducer(
        initialState,
        loadNewsDetailsSuccess({
          description: '',
          title: '',
          image: '',
          eventDate: new Date('01/01/2020'),
          visibleOn: new Date('01/01/2020'),
          hideOn: new Date('01/01/2020'),
        })
      )
    ).toEqual({
      ...initialState,
      newData: {
        description: '',
        title: '',
        image: '',
        eventDate: new Date('01/01/2020'),
        visibleOn: new Date('01/01/2020'),
        hideOn: new Date('01/01/2020'),
      },
    });
  });

  it('should handle LOAD_NEWS_DETAILS_FAILURE', () => {
    expect(reducer(initialState, loadNewsDetailsFailure('error'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle RESET_NEWS_DETAILS', () => {
    expect(
      reducer(
        {
          ...initialState,
          newData: {
            id: '',
            description: '',
            title: '',
            image: '',
            eventDate: new Date(),
            visibleOn: new Date(),
            hideOn: new Date(),
          },
        },
        resetNewsDetails()
      )
    ).toEqual({
      ...initialState,
      newData: undefined,
    });
  });

  it('should handle LOAD_NEWS_TAXONOMY_SUCCESS', () => {
    expect(
      reducer(
        {
          ...initialState,
          newData: {
            id: '',
            description: '',
            title: '',
            image: '',
            eventDate: undefined,
            visibleOn: undefined,
            hideOn: undefined,
            assignedTaxonomies: [],
            relatedPublications: [],
          },
        },
        loadNewsTaxonomySuccess([])
      )
    ).toEqual({
      ...initialState,
      newData: {
        id: '',
        description: '',
        title: '',
        image: '',
        eventDate: undefined,
        visibleOn: undefined,
        hideOn: undefined,
        assignedTaxonomies: [],
        relatedPublications: [],
      },
    });
  });

  it('should handle LOAD_NEWS_PUBLICATIONS_SUCCESS', () => {
    expect(
      reducer(
        {
          ...initialState,
          newData: {
            id: '',
            description: '',
            title: '',
            image: '',
            eventDate: undefined,
            visibleOn: undefined,
            hideOn: undefined,
            assignedTaxonomies: [],
            relatedPublications: [],
          },
        },
        loadNewsPublicationsSuccess([])
      )
    ).toEqual({
      ...initialState,
      newData: {
        id: '',
        description: '',
        title: '',
        image: '',
        eventDate: undefined,
        visibleOn: undefined,
        hideOn: undefined,
        assignedTaxonomies: [],
        relatedPublications: [],
      },
    });
  });

  it('should handle CLOSE_ERROR_NEWS_DETAILS', () => {
    expect(reducer(initialState, closeErrorNewsDetails())).toEqual({
      ...initialState,
      error: false,
      errorMsg: '',
    });
  });
});
