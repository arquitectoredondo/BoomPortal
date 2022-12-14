import axios from 'axios';
import { fetchPortalsData, createPortal } from './portals.service';
import MockAdapter from 'axios-mock-adapter';

describe('portal service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches successfully data from portal list', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Portal',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/list`
      )
      .reply(200, data);

    fetchPortalsData().then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to create portal', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/create`
      )
      .reply(200, data);

    createPortal('name').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
