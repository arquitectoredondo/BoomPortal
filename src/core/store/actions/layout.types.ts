export const CHANGE_SIDEBAR_LAYOUT: string = '[LAYOUT] CHANGE SIDEBAR LAYOUT';

export interface ChangeSidebarLayout {
  type: typeof CHANGE_SIDEBAR_LAYOUT;
  payload: boolean;
}

export type LayoutActionTypes = ChangeSidebarLayout;
