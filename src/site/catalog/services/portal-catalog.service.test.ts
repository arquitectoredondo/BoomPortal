import axios from 'axios';
import {
  getPortalCatalog,
  saveDraftPortalCatalog,
  getYearsList,
  searchPublication,
} from './portal-catalog.service';
import MockAdapter from 'axios-mock-adapter';

describe('portal catalog service ', () => {
  var mock = new MockAdapter(axios);

  it('fetches portal catalog successfully', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalog/id`
      )
      .reply(200, data);

    getPortalCatalog('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('save portal catalog successfully', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalog/id`
      )
      .reply(200, data);

    saveDraftPortalCatalog(undefined).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('get portal years successfully', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/settings/years/id`
      )
      .reply(200, data);

    getYearsList('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('search publications succesfully', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/catalogue/settings/id?searchTerm=search`
      )
      .reply(200, data);

    searchPublication('search', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });
});
