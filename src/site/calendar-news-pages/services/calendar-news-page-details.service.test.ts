import axios from 'axios';
import {
  getCalendarNewsPageDetails,
  updateCalendarNewsPageLayout,
  publishCalendarNewsPage,
  revertCalendarNewsPage,
  deleteCalendarNewsPage,
  addCalendarNewsPageWidget,
  updateCalendarNewsPageWidget,
  deleteCalendarNewsPageWidget,
} from './calendar-news-page-details.service';
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

    getCalendarNewsPageDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('publishCalendarNewsPage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/id`
      )
      .reply(200, data);

    publishCalendarNewsPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('revertCalendarNewsPage', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/id`
      )
      .reply(200, data);

    revertCalendarNewsPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('deleteCalendarNewsPage', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id`
      )
      .reply(200, data);

    deleteCalendarNewsPage('id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('addCalendarNewsPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/createpagewidget`
      )
      .reply(200, data);

    addCalendarNewsPageWidget(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('updateCalendarNewsPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/updatepagewidget`
      )
      .reply(200, data);

    updateCalendarNewsPageWidget(undefined, 'id').then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(true).toBeTruthy();
  });

  it('deleteCalendarNewsPageWidget', async () => {
    const data: any = { data: [] };
    mock
      .onDelete(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/id/pagewidget/id2`
      )
      .reply(200, data);

    deleteCalendarNewsPageWidget('id2', 'id').then((response) => {
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

    updateCalendarNewsPageLayout(
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
