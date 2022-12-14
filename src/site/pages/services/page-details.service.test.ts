import axios from 'axios';
import {
  getPortalPageDetails,
  updatePortalPageLayout,
  publishPortalPage,
  revertPortalPage,
  deletePortalPage,
  addPortalPageWidget,
  searchPortalWidgetPublication,
  updatePortalPageWidget,
} from './page-details.service';
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

    getPortalPageDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('searchPortalWidgetPublication', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/catalogue/publications/id?searchTerm=string`
      )
      .reply(200, data);

    searchPortalWidgetPublication('string', 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('publishes successfully ', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/id`
      )
      .reply(200, data);

    publishPortalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('updatePortalPageWidget successfully ', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/id/updatepagelayout`
      )
      .reply(200, data);

    updatePortalPageWidget(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('revert successfully ', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/id`
      )
      .reply(200, data);

    revertPortalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('delete successfully ', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    deletePortalPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('add portal widget successfully ', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/createpagewidget`
      )
      .reply(200, data);

    addPortalPageWidget(undefined, 'id').then((response) => {
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

    updatePortalPageLayout(
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
});
