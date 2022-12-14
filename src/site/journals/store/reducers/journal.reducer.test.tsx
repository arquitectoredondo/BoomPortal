import reducer, { JournalState } from './journals.reducer';
import {
  loadJournals,
  openCloseCreationDialog,
  loadJournalsSuccess,
  loadJournalsFailure,
} from '../actions/journals.actions';

const initialState: JournalState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: '',
  journals: [],
};

describe('portals reducer', () => {
  it('should handle LOAD_PORTALS', () => {
    expect(reducer(initialState, loadJournals())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_PORTALS_SUCCESS', () => {
    expect(reducer(initialState, loadJournalsSuccess([]))).toEqual({
      ...initialState,
      journals: [],
    });
  });

  it('should handle LOAD_PORTALS_FAILURE', () => {
    expect(reducer(initialState, loadJournalsFailure('error'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'error',
    });
  });

  it('should handle OPEN_CLOSE_CREATE_DIALOG', () => {
    expect(reducer(initialState, openCloseCreationDialog(true))).toEqual({
      ...initialState,
      dialogOpen: true,
    });
  });
});
