import reducer, { PortalState } from './portals.reducer';
import {
  loadPortals,
  loadPortalsSuccess,
  loadPortalsFailure,
  openCloseCreationDialog,
} from '../actions/portals.actions';

const initialState: PortalState = {
  loading: false,
  error: false,
  dialogOpen: false,
  errorMsg: '',
  portals: [],
};

describe('portals reducer', () => {
  it('should handle LOAD_PORTALS', () => {
    expect(reducer(initialState, loadPortals())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOAD_PORTALS_SUCCESS', () => {
    expect(reducer(initialState, loadPortalsSuccess([]))).toEqual({
      ...initialState,
      portals: [],
    });
  });

  it('should handle LOAD_PORTALS_FAILURE', () => {
    expect(reducer(initialState, loadPortalsFailure('e'))).toEqual({
      ...initialState,
      error: true,
      errorMsg: 'e',
    });
  });

  it('should handle OPEN_CLOSE_CREATE_DIALOG', () => {
    expect(reducer(initialState, openCloseCreationDialog(true))).toEqual({
      ...initialState,
      dialogOpen: true,
    });
  });
});
