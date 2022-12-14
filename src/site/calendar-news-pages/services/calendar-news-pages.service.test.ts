import axios from 'axios';
import {
  getCalendarNewsPages,
  createCalendarNewsPage,
  getPages,
  updateCalendarNewsPage,
  deleteCalendarNewsPage,
} from './calendar-news-pages.service';
import MockAdapter from 'axios-mock-adapter';

describe('page service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches successfully data from page list', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Page',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/id`
      )
      .reply(200, data);

    getCalendarNewsPages('id').then((response) => {
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

    createCalendarNewsPage({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to be deleted', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    deleteCalendarNewsPage('123456').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('get pages', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    getPages('123456', 'test').then((response) => {
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

    updateCalendarNewsPage({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
