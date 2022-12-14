import reducer, { AuthState } from './auth.reducer';
import {
  logIn,
  logOff,
  logInSuccess,
  logInFailure
} from '../actions/auth.actions';

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  error: false,
  user: undefined
};

describe('auth reducer', () => {
  it('should handle LOG_IN', () => {
    expect(reducer(initialState, logIn())).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle LOG_IN_SUCCESS', () => {
    expect(reducer(initialState, logInSuccess('user'))).toEqual({
      ...initialState,
      loading: false,
      error: false,
      loggedIn: true,
      user: 'user'
    });
  });

  it('should handle LOG_IN_FAILURE', () => {
    expect(reducer(initialState, logInFailure())).toEqual({
      ...initialState,
      error: true
    });
  });

  it('should handle LOG_OFF', () => {
    expect(reducer(initialState, logOff())).toEqual({
      ...initialState,
      loggedIn: false
    });
  });
});
