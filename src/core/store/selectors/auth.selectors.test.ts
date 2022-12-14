import {
  selectAuthState,
  selectLoginLoading,
  selectLoginError,
  selectLoginUser,
  selectLoginLoggedIn,
} from './auth.selectors';

const appState: any = {
  core: {
    auth: {
      loggedIn: false,
      loading: false,
      error: false,
      user: undefined,
    },
  },
};

describe('auth selectors', () => {
  it('should handle selectAuthState', () => {
    expect(selectAuthState(appState)).toEqual({
      loggedIn: false,
      loading: false,
      error: false,
      user: undefined,
    });
  });

  it('should handle selectLoginLoading', () => {
    expect(selectLoginLoading(appState)).toEqual(false);
  });

  it('should handle selectLoginError', () => {
    expect(selectLoginError(appState)).toEqual(false);
  });

  it('should handle selectLoginUser', () => {
    expect(selectLoginUser(appState)).toEqual(undefined);
  });

  it('should handle selectLoginLoggedIn', () => {
    expect(selectLoginLoggedIn(appState)).toEqual(false);
  });
});
