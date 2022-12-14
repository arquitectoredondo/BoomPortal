import axios from 'axios';
import {
  fetchThemeData,
  createTheme,
  retrieveMenuThemes,
  deleteTheme,
} from './theme.service';
import MockAdapter from 'axios-mock-adapter';

describe('Theme service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches the list of themes', async () => {
    const data: any = {
      data: [
        {
          id: '1',
          name: 'Theme1',
          createdBy: 'Sander',
          status: 'Gepubliceerd',
          creationDate: '15 april 2019',
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/list/`
      )
      .reply(200, data);

    fetchThemeData(undefined).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to create theme', async () => {
    const data = {
      id: '1',
      name: 'Theme1',
      createdBy: 'Sander',
      status: 'Gepubliceerd',
      creationDate: '15 april 2019',
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    createTheme(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve menu themes', async () => {
    const data = {
      id: '1',
      name: 'Theme1',
      createdBy: 'Sander',
      status: 'Gepubliceerd',
      creationDate: '15 april 2019',
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/listbyportalid/id`
      )
      .reply(200, data);

    retrieveMenuThemes('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('deleteTheme', async () => {
    const data = {
      id: '1',
      name: 'Theme1',
      createdBy: 'Sander',
      status: 'Gepubliceerd',
      creationDate: '15 april 2019',
    };

    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/id`
      )
      .reply(200, data);

    deleteTheme('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
