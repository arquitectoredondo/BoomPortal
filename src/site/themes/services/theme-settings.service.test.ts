import axios from 'axios';
import {
  fetchThemeById,
  revertThemeSettings,
  saveDrafThemeSettings,
  publishThemeSettings,
} from './theme-settings.service';
import MockAdapter from 'axios-mock-adapter';

describe('Theme settings service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches successfully theme settings by id', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Setting',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/id`
      )
      .reply(200, data);

    fetchThemeById('id').then((response) => {
      expect(response).toEqual(data);
    });
  });

  it('revert succefully theme settings', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Setting',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/revert/id`
      )
      .reply(200, data);

    revertThemeSettings('id').then((response) => {
      expect(response).toEqual(data);
    });
  });

  it('save succefully theme settings', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Setting',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/update`
      )
      .reply(200, data);

    saveDrafThemeSettings(undefined).then((response) => {
      expect(response).toEqual(data);
    });
  });

  it('publish succefully theme settings', async () => {
    const data: any = {
      data: [
        {
          id: 'id',
          label: 'Setting',
          createdBy: 'admin',
          creationDate: '2020-04-06T10:06:51.565+0000',
          status: 'status',
          link: null,
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/publish/id`
      )
      .reply(200, data);

    publishThemeSettings('id').then((response) => {
      expect(response).toEqual(data);
    });
  });
});
