import axios from 'axios';

import { PageWidget } from '../../../shared/models/layout.model';

export function getCalendarNewsPageDetails(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${id}`
  );
}

export function updateCalendarNewsPageLayout(
  layout: any,
  pageLayout: PageWidget[],
  pageId: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/updatepagelayout`,
    {
      id: pageId,
      pageWidgets: updateMapper(layout, pageLayout),
    }
  );
}

export function publishCalendarNewsPage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/${pageId}`
  );
}

export function revertCalendarNewsPage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/${pageId}`
  );
}

export function deleteCalendarNewsPage(pageId: string): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}`
  );
}
export function addCalendarNewsPageWidget(
  form: any,
  pageId: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/createpagewidget`,
    form
  );
}

export function updateCalendarNewsPageWidget(
  form: any,
  pageId: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/updatepagewidget`,
    form
  );
}

export function deleteCalendarNewsPageWidget(
  widgetId: string,
  pageId: string
): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/pagewidget/${widgetId}`
  );
}

export function updateMapper(
  gridLayout: any,
  pageLayout: PageWidget[]
): PageWidget[] {
  return gridLayout.map((res: any) => ({
    ...pageLayout[res.i],
    x: res.x,
    y: res.y,
    h: res.h,
    w: res.w,
  }));
}
