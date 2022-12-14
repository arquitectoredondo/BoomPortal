import axios from 'axios';
import { PageWidget } from '../../../shared/models/layout.model';
import { updateMapper } from '../../pages/services/page-details.service';

export function getThemePageDetails(id: string): Promise<any> {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${id}`
  );
}

export function updateThemePageLayout(
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

export function publishThemePage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/publish/${pageId}`
  );
}

export function revertThemePage(pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/revert/${pageId}`
  );
}

export function deleteThemePage(pageId: string): Promise<any> {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}`
  );
}
export function addThemePageWidget(form: any, pageId: string): Promise<any> {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/boom/services/rest/pagemanagement/v1/${pageId}/createpagewidget`,
    form
  );
}

export function updateThemePageWidget(form: any, pageId: string): Promise<any> {
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
