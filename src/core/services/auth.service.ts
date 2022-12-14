import axios from 'axios';

export function getUserInfo(): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/currentUser`
  );
}

export function authenticateRegisteredUser(): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/authmanagement/authenticate`
  );
}
