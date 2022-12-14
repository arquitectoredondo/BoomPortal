import axios from 'axios';
import {
  getPages,
  createPortalPage,
  updatePortalPage,
  deletePortalPage,
} from './pages.service';
import MockAdapter from 'axios-mock-adapter';

describe('page service ', () => {
  var mock = new MockAdapter(axios);

  it('should retrieve theme pages', async () => {
    const data: any = {
      data: [],
    };
    expect(true).toBeTruthy();
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    getPages('id', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to create page', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    createPortalPage({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to update page', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/update`
      )
      .reply(200, data);

    updatePortalPage({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to delete page', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    deletePortalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
