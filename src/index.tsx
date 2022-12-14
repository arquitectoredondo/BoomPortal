import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base/_base.scss';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import './core/i18n/i18n';
import { Provider } from 'react-redux';
import store from './core/store/store';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloakConfig from './keycloak';
import App from './core/containers/app-component/App';

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <KeycloakProvider keycloak={keycloakConfig}>
      <App />
    </KeycloakProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
