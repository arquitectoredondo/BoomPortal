import axios from 'axios';
import {
  getThemeCatalog,
  updateThemeCatalog,
  getThemeYearsList,
  searchThemePublication,
} from './themeCatalog.service';
import MockAdapter from 'axios-mock-adapter';

describe('theme catalog service ', () => {
  var mock = new MockAdapter(axios);

  it('get theme catalog', async () => {
    const data: any = {
      data: [
        {
          name: 'Arbeid:ongeschiktheid:en ziekte',
          id: 'aa82479e6b454fbd9f92f58f8a631a35',
          tagFamilyName: 'subject',
          parentUuid: 'a2a9b411b04d48728666025665783003',
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/id`
      )
      .reply(200, data);

    getThemeCatalog('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('update theme catalog', async () => {
    const data: any = {
      data: [],
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/update`
      )
      .reply(200, data);

    updateThemeCatalog('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('getThemeYearsList', async () => {
    const data: any = {
      data: [],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/settings/years/id`
      )
      .reply(200, data);

    getThemeYearsList('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('searchThemePublication', async () => {
    const data: any = {
      data: [],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/portal/catalogue/publications/id?searchTerm=string`
      )
      .reply(200, data);

    searchThemePublication('string', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
