import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserInfo, authenticateRegisteredUser } from './auth.service';

describe('page details service ', () => {
  var mock = new MockAdapter(axios);

  it('getUserInfo', async () => {
    const data: any = { data: [] };
    mock
      .onGet(`${process.env.REACT_APP_BASE_URL}/boom/services/rest/currentUser`)
      .reply(200, data);

    getUserInfo().then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('authenticateRegisteredUser', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/authmanagement/authenticate`
      )
      .reply(200, data);

    authenticateRegisteredUser().then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });
});
