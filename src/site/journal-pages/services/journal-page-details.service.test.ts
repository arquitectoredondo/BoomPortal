import axios from 'axios';
import {
  getPortalJournalPageDetails,
  updatePortalJournalPageLayout,
  publishPortalJournalPage,
  revertPortalJournalPage,
  deletePortalJournalPage,
  addPortalJournalPageWidget,
  updatePortalJournalPageWidget,
  deleteJournalPageWidget,
  searchPortalWidgetPublication,
  layoutMapper,
} from './journal-page-details.service';
import MockAdapter from 'axios-mock-adapter';

describe('page details service ', () => {
  var mock = new MockAdapter(axios);

  it('fetches successfully widgets from page details', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    getPortalJournalPageDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('publishPortalJournalPage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/id`
      )
      .reply(200, data);

    publishPortalJournalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('revertPortalJournalPage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/id`
      )
      .reply(200, data);

    revertPortalJournalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('deletePortalJournalPage', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    deletePortalJournalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('addPortalJournalPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/createpagewidget`
      )
      .reply(200, data);

    addPortalJournalPageWidget(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('updatePortalJournalPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/updatepagewidget`
      )
      .reply(200, data);

    updatePortalJournalPageWidget(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('deleteJournalPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/pagewidget/id2`
      )
      .reply(200, data);

    deleteJournalPageWidget('id2', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('searchPortalWidgetPublication', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/publications/id?searchTerm=search`
      )
      .reply(200, data);

    searchPortalWidgetPublication('search', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('post successfully update grid', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/updatepagelayout`
      )
      .reply(200, data);

    updatePortalJournalPageLayout(
      [
        {
          id: '05486c89931c495a9bba30d0a17c2b14',
          name: 'PageWidget1',
          widget: {
            id: 'bd15695e89c6486289cfa026b2db0a49',
            name: 'Widget_1',
            description: null,
            image: null,
            preview: null,
            sourceUrl: null,
            widgetType: 1,
            minH: 8,
            minW: 4,
          },
          h: 8,
          w: 10,
          x: 0,
          y: 0,
        },
      ],
      [],
      'id'
    ).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('should map correctly', async () => {
    const data: any = layoutMapper([
      {
        uuid: 'bd15695e89c6486289cfa026b2db0a49',
        name: 'Widget_1',
        description: 'desc',
        image: undefined,
        widgetType: 1,
        minH: 8,
        minW: 4,
        x: 1,
        y: 1,
        h: 54,
        w: 12,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderTop: false,
      },
    ]);
    expect(data).toStrictEqual([
      {
        uuid: 'bd15695e89c6486289cfa026b2db0a49',
        name: 'Widget_1',
        description: 'desc',
        image: undefined,
        widgetType: 1,
        minH: 8,
        minW: 4,
        x: 1,
        y: 1,
        h: 54,
        w: 12,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderTop: false,
        i: '0',
        static: false,
      },
    ]);
  });
});
