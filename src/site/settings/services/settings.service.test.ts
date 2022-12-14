import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getPortalSettings,
  saveDraftPortalSettings,
  revertPortalSettings,
  publishPortalSettings,
  addMenuItemPortalSettings,
  removeMenuItemPortalSettings,
  retrieveMenuPages,
  retrieveMenuThemes,
  getPages,
  getAllPages,
  deletePortal,
} from './settings.service';

describe('settings service ', () => {
  const settingsMock = {
    id: 'string',
    canRevert: false,
    name: 'string',
    htmlFavicon: 'string',
    logo: 'string',
    url: 'string',
    menuItems: [],
    colorPrimary: 'string',
    colorSecondary: 'string',
    colorMainMenu: 'string',
    colorSecondaryMenu: 'string',
    fontPrimary: 'string',
    fontSecondary: 'string',
  };

  var mock = new MockAdapter(axios);
  it('fetches successfully settings data', async () => {
    const data: any = {
      data: settingsMock,
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/id`
      )
      .reply(200, data);

    getPortalSettings('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('saves successfully settings draft data', async () => {
    const data: any = {
      data: {},
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/update`
      )
      .reply(200, data);

    saveDraftPortalSettings(settingsMock).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('revert successfully settings data', async () => {
    const data: any = {
      data: settingsMock,
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/revert/id`
      )
      .reply(200, data);

    revertPortalSettings('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('publish successfully settings data', async () => {
    const data: any = {
      data: settingsMock,
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/publish/id`
      )
      .reply(200, data);

    publishPortalSettings('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('add menu item succesfully adds an item menu', async () => {
    const data: any = {
      data: {},
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/addmenuitem`
      )
      .reply(200, data);

    addMenuItemPortalSettings({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('remove menu item succesfully removes an item menu', async () => {
    const data: any = {
      data: {},
    };

    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/addmenuitem/id2/id`
      )
      .reply(200, data);

    removeMenuItemPortalSettings('id', 'id2').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve successfully pages', async () => {
    const data: any = {
      data: [],
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/listbyportalid/id`
      )
      .reply(200, data);

    retrieveMenuPages('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve successfully themes', async () => {
    const data: any = {
      data: [],
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/id`
      )
      .reply(200, data);

    retrieveMenuThemes('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('should get pages', async () => {
    const data: any = {
      data: [],
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    getPages('id', 'textToSearch').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('should get all pages', async () => {
    const data: any = {
      data: [],
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/listAllPages/123456`
      )
      .reply(200, data);

    getAllPages('123456').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('should delete portal', async () => {
    const data: any = {
      data: [],
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/settings/123456`
      )
      .reply(200, data);

    deletePortal('123456').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
