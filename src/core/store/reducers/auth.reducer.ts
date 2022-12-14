import {
  AuthActionTypes,
  LOG_IN,
  LOG_OFF,
  LOG_IN_SUCCESS,
  LogInSuccess,
  LOG_IN_FAILURE
} from '../actions/auth.types';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  error: boolean;
  user: any;
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  error: false,
  user: undefined
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        loading: true,
        error: false,
        user: undefined
      };
    }

    case LOG_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        user: (action as LogInSuccess).payload,
        loggedIn: true
      };
    }

    case LOG_IN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        user: undefined,
        loggedIn: false
      };
    }

    case LOG_OFF: {
      return {
        ...state,
        loggedIn: false,
        user: undefined
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
