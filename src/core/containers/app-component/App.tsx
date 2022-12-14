import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../login/login';
import  Site  from '../../../site/site/containers/site/site';
import { useKeycloak } from '@react-keycloak/web';
import { JwtInterceptor } from '../../services/interceptor.service';
import { CircularProgress } from '@material-ui/core';
import { logInSuccess } from '../../store/actions/auth.actions';
import { connect } from 'react-redux';
import {
  authenticateRegisteredUser,
  getUserInfo,
} from '../../services/auth.service';

interface AppProps {
  logInSuccess: typeof logInSuccess;
}

export function App(props: AppProps): JSX.Element {
  const [keycloak, initialized] = useKeycloak();

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    localStorage.removeItem('loggedInAdmin');
    localStorage.removeItem('keycloakTokenAdmin');
    if (localStorage.getItem('mwTokenAdmin')) {
      setLoading(false);
      localStorage.setItem('loggedInAdmin', 'true');
      getUserInfo().then((user: any) => props.logInSuccess(user.data));
    } else {
      if (keycloak.token) {
        setLoading(true);
        localStorage.setItem('keycloakTokenAdmin', keycloak.token);
        authenticateRegisteredUser().then((result: any) => {
          localStorage.setItem('loggedInAdmin', 'true');
          localStorage.setItem('mwTokenAdmin', result.data.token);
          keycloak.logout();
          setLoading(false);
          getUserInfo().then((user: any) => props.logInSuccess(user.data));
        });
      } else if (initialized) {
        setLoading(false);
        keycloak.login();
      }
    }
    // eslint-disable-next-line
  }, [keycloak.token, initialized]);

  // init interceptor
  JwtInterceptor(keycloak);

  function PrivateRoute({ children, ...rest }: any): JSX.Element {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('mwTokenAdmin') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  if (!initialized) {
    return (
      <div className="init-loading-screen">
        <span>
          <CircularProgress size={160} />
        </span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login loading={loading} />
        </Route>
        <PrivateRoute path="/">
          <Site />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default connect(null, {
  logInSuccess,
})(App);
