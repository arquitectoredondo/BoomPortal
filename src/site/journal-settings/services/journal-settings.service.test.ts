import axios from 'axios';
import {
  getJournalSettings,
  saveDraftJournalSettings,
  revertJournalSettings,
  publishJournalSettings,
  addMenuItemJournalSettings,
  deleteMenuItemJournalSettings,
  retrievePages,
  getPages,
  retrieveJournalList,
  deleteJournal,
} from './journal-settings.service';
import MockAdapter from 'axios-mock-adapter';

describe('Journal settings service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches journal settings', async () => {
    const data: any = {
      data: {
        id: '34234523523',
        canRevert: false,
        name: 'Journal 3',
        menu: [],
        color: '',
      },
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/id`
      )
      .reply(200, data);

    getJournalSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to save the draft version', async () => {
    const data = {
      uuid: 'string;',
      name: 'string;',
      editedBy: 'string;',
      colour: 'string;',
      visibility: true,
      menuItems: [],
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    saveDraftJournalSettings(data).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('Get the data os the previous version (draft) of the journal', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    revertJournalSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to the publish version', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/create`
      )
      .reply(200, data);

    publishJournalSettings('34234523523').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('add menu item', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/addmenuitem`
      )
      .reply(200, data);

    addMenuItemJournalSettings(undefined).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('delete menu item', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/menuitem/id1/id2`
      )
      .reply(200, data);

    deleteMenuItemJournalSettings('id1', 'id2').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve pages', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list/id`
      )
      .reply(200, data);

    retrievePages('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('getPages', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
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

  it('retrieve journal list', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    retrieveJournalList('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('retrieve journal list', async () => {
    const data = {
      id: '34234523523',
      canRevert: false,
      name: 'Journal 3',
      menu: [],
      color: '',
    };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/list`
      )
      .reply(200, data);

    deleteJournal('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
