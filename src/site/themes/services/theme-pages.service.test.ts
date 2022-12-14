import axios from 'axios';
import {
  createThemePage,
  updateThemePage,
} from './theme-pages.service';
import MockAdapter from 'axios-mock-adapter';

describe('Theme page service ', () => {
  var mock = new MockAdapter(axios);

  it('should create theme pages', async () => {
    const data: any = {
      data: [],
    };
    expect(true).toBeTruthy();
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    createThemePage('id', {
      label: 'label',
      permalink: 'permalink',
    }).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('should update theme pages', async () => {
    const data: any = {
      data: [],
    };
    expect(true).toBeTruthy();
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/update`
      )
      .reply(200, data);

    updateThemePage(undefined).then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
