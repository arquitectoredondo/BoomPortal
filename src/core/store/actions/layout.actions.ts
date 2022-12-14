import { LayoutActionTypes, CHANGE_SIDEBAR_LAYOUT } from './layout.types';

export const changeSidebarLayout = (
  sidebarCollapsed: boolean
): LayoutActionTypes => ({
  type: CHANGE_SIDEBAR_LAYOUT,
  payload: sidebarCollapsed
});
