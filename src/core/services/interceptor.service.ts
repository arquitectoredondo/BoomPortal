import axios from 'axios';

export const JwtInterceptor = (keycloak: any) => {
  axios.interceptors.request.use(
    async (config: any) => {
      const mwTokenAdmin: string | null = localStorage.getItem('mwTokenAdmin');
      const keycloakTokenAdmin: string | null = localStorage.getItem(
        'keycloakTokenAdmin'
      );
      const loggedInAdmin: string | null = localStorage.getItem('loggedInAdmin');

      if (mwTokenAdmin && loggedInAdmin) {
        config.headers['Token'] = `Bearer ${mwTokenAdmin}`;
      }

      if (keycloakTokenAdmin && !loggedInAdmin) {
        config.headers['Authorization'] = `Bearer ${keycloakTokenAdmin}`;
      }

      // Prevent IE from caching GET calls and retrieving wrong info
      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = 'Sat, 01 Jan 2000 00:00:00 GMT';
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (config: any) => {
      return config;
    },
    (error: any) => {
      if (error.response && 401 === error.response.status) {
        localStorage.removeItem('loggedInAdmin');
        localStorage.removeItem('keycloakTokenAdmin');
        localStorage.removeItem('mwTokenAdmin');
        keycloak.logout();
      }
      return Promise.reject(error);
    }
  );

  return axios;
};
