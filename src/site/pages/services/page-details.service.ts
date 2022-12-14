import axios from 'axios';

import { PageWidget } from '../../../shared/models/layout.model';

export function getPortalPageDetails(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${id}`
  );
}

export function updatePortalPageLayout(
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

export function publishPortalPage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/${pageId}`
  );
}

export function revertPortalPage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/${pageId}`
  );
}

export function deletePortalPage(pageId: string): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}`
  );
}
export function addPortalPageWidget(form: any, pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/createpagewidget`,
    form
  );
}

export function updatePortalPageWidget(
  form: any,
  pageId: string
): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/updatepagewidget`,
    form
  );
}

export function deletePageWidget(
  widgetId: string,
  pageId: string
): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/pagewidget/${widgetId}`
  );
}

export function searchPortalWidgetPublication(
  searchTerm: string,
  id: string
): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/thememanagement/v1/catalogue/publications/${id}?searchTerm=${searchTerm}`
  );
}

export function layoutMapper(result: PageWidget[]): PageWidget[] {
  return result.map((res: PageWidget, i: number) => ({
    ...res,
    minW: res.minW,
    minH: res.minH,
    i: i.toString(),
    static: false,
  }));
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
