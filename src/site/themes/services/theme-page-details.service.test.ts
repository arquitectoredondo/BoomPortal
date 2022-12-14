import axios from 'axios';
import {
  getThemePageDetails,
  updateThemePageLayout,
  publishThemePage,
  revertThemePage,
  deleteThemePage,
  addThemePageWidget,
  updateThemePageWidget,
  deletePageWidget,
} from './theme-page-details.service';
import MockAdapter from 'axios-mock-adapter';

describe('theme page details service ', () => {
  var mock = new MockAdapter(axios);

  it('fetches successfully widgets from page details', async () => {
    const data: any = { data: [] };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    getThemePageDetails('id').then((response) => {
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

    updateThemePageLayout(
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
    ).then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully publishThemePage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/0`
      )
      .reply(200, data);

    publishThemePage('0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully revertThemePage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/0`
      )
      .reply(200, data);

    revertThemePage('0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully deleteThemePage', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/0`
      )
      .reply(200, data);

    deleteThemePage('0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully addThemePageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/0/createpagewidget`
      )
      .reply(200, data);

    addThemePageWidget(undefined, '0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully updateThemePageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/0/updatepagewidget`
      )
      .reply(200, data);

    updateThemePageWidget(undefined, '0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully deletePageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/0/pagewidget/0`
      )
      .reply(200, data);

    deletePageWidget('0', '0').then((response: any) => {
      expect(response.data).toEqual(data);
    });
  });
});
