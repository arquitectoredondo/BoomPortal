import axios from 'axios';
import {
  getCalendarNewSettings,
  saveDraftCalendarNewSettings,
  revertCalendarNewSettings,
  publishCalendarNewSettings,
  retrieveDatabaseList,
  deleteCalendarNew,
  getPages,
} from './calendar-new-settings.service';
import MockAdapter from 'axios-mock-adapter';

describe('Calendar New settings service ', () => {
  var mock = new MockAdapter(axios);
  const data: any = {
    data: {
      id: '34234523523',
      canRevert: false,
      name: 'Database 3',
      menu: [],
      color: '',
    },
  };
  it('fetches calendar new database settings', async () => {
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/id`
      )
      .reply(200, data);

    getCalendarNewSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to save the draft version', async () => {
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    saveDraftCalendarNewSettings(data).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('Get the data os the previous version (draft) of the calendar new database', async () => {
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    revertCalendarNewSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to the publish version', async () => {
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    publishCalendarNewSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('fetches database list', async () => {
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/search?page=1&size=100&id=1234`
      )
      .reply(200, data);

    retrieveDatabaseList('1234').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to be deleted', async () => {
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/calendarnewsmanagement/v1/calendarnews/123456`
      )
      .reply(200, data);

    deleteCalendarNew('123456').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('get pages', async () => {
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    getPages('123456', 'test').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
