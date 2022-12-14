import Keycloak from 'keycloak-js';

console.log(process.env);

const keycloakConfig = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});

export default keycloakConfig;
