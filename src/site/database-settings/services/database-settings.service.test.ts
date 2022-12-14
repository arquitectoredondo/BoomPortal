import axios from 'axios';
import {
  getDatabaseSettings,
  saveDraftDatabaseSettings,
  revertDatabaseSettings,
  publishDatabaseSettings,
  retrieveDatabaseList,
  deleteDatabase,
} from './database-settings.service';
import MockAdapter from 'axios-mock-adapter';

describe('Database settings service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches database settings', async () => {
    const data: any = {
      data: {
        id: '34234523524',
        canRevert: false,
        name: 'Database 1',
        description: 'desc',
      },
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/34234523524`
      )
      .reply(200, data);

    getDatabaseSettings('34234523524').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to save the draft version', async () => {
    const data: any = {
      uuid: 'string;',
      name: 'string;',
      description: 'string;',
      editedBy: 'string;',
      visibility: true,
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/update`
      )
      .reply(200, data);

    saveDraftDatabaseSettings(data).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('Get the data of the previous version (draft) of the database', async () => {
    const data = {
      id: '34234523524',
      canRevert: false,
      name: 'Database 1',
      description: 'string;',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/revert/34234523524`
      )
      .reply(200, data);

    revertDatabaseSettings('34234523524').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to the publish version', async () => {
    const data = {
      id: '34234523524',
      canRevert: false,
      name: 'Database 1',
      description: 'string;',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}boom/services/rest/databasemanagement/v1/database/publish/34234523524`
      )
      .reply(200, data);

    publishDatabaseSettings('34234523524').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve database list', async () => {
    const data = {
      id: 'AR-UPDATES',
      url: 'https://url.com',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/search?page=1&size=10`
      )
      .reply(200, data);

    retrieveDatabaseList().then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('revert database settings', async () => {
    const data = {
      uuid: '123456',
      id: 'AR-UPDATES',
      url: 'https://url.com',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/revert/123456`
      )
      .reply(200, data);

    revertDatabaseSettings('123456').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('delete database', async () => {
    const data = {
      uuid: '123456',
      id: 'AR-UPDATES',
      url: 'https://url.com',
    };
    mock.onDelete(`${process.env.REACT_APP_BASE_URL}/123456`).reply(200, data);

    deleteDatabase('123456').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });
});
